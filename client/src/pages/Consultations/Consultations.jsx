import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchConsultations } from "../../features/Consultations/consultationSlice";
import ConsultationListFilter from "../../features/Consultations/components/common/ConsultationListFilter";
import getConsultationColumns from "../../features/Consultations/data/ConsultationColumns";
import { MainHeading, Table } from "../../components/ui";

const Consultations = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { consultationList, status } = useSelector(
    (state) => state.consultations
  );

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  });

  useEffect(() => {
    if (dateRange?.startDate && dateRange?.endDate) {
      dispatch(
        fetchConsultations({
          search,
          dateRange: {
            startDate: dayjs(dateRange?.startDate).format("YYYY-MM-DD"),
            endDate: dayjs(dateRange?.endDate).format("YYYY-MM-DD"),
          },
        })
      );
    }
  }, [search, dateRange]);

  if (status === "failed") return <div>Error loading consultations</div>;

  const consultationColumns = getConsultationColumns(navigate);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 lg:px-12 py-6 flex flex-col gap-2 rounded-lg mx-2 lg:mx-5 my-2 lg:mt-5 h-full">
      <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
        <MainHeading title={"Out-Patients"} className="mt-5" />
        <ConsultationListFilter
          onChange={(filters) => {
            setSearch(filters?.search);
            setDateRange(filters?.dateRange);
          }}
        />
      </div>
      <div className="h-full">
        <Table
          rows={consultationList}
          columns={consultationColumns}
          isLoading={status === "loading"}
          customStyles={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Consultations;
