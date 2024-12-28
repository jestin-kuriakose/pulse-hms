import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import NewAppointmentModal from "../../features/Appointments/components/modal/NewAppointmentModal";
import EditAppointmentModal from "../../features/Appointments/components/modal/EditAppointmentModal";
import AppointmentListFilter from "../../features/Appointments/components/ui/AppointmentListFilter";
import DeleteAppointmentModal from "../../features/Appointments/components/modal/DeleteAppointmentModal";
import getAppointmentColumns from "../../features/Appointments/data/AppointmentColumns";
import {
  clearCurrentAppointment,
  getAppointments,
  removeAppointment,
  setCurrentAppointment,
} from "../../features/Appointments/appointmentsSlice";
import { Button, MainHeading, Table } from "../../components/ui";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";

const Appointments = () => {
  const [openNewAppointmentModal, setOpenNewAppointmentModal] = useState(false);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [showDeleteAppointmentModal, setShowDeleteAppointmentModal] =
    useState(false);
  const [openViewAppointmentModal, setOpenViewAppointmentModal] =
    useState(false);

  const currentAppointment = useSelector(
    (state) => state.appointments.currentAppointment
  );

  const { appointments, status } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(
      getAppointments({
        dateRange: {
          startDate: dayjs(dateRange?.startDate).format("YYYY-MM-DD"),
          endDate: dayjs(dateRange?.endDate).format("YYYY-MM-DD"),
        },
        search,
      })
    );
  }, [dispatch, search, dateRange]);

  const handleEditClick = (appointmentId) => {
    const appointment = appointments.find((appt) => appt.id === appointmentId);
    dispatch(setCurrentAppointment(appointment));
    setOpenViewAppointmentModal(true);
  };

  const handleDeleteAppointment = async () => {
    dispatch(removeAppointment(currentAppointmentId));
    clearCurrentAppointment();
    handleCloseDeleteAppointmentModal();
  };

  const handleShowDeleteAppointmentModal = (appointmentId) => {
    setShowDeleteAppointmentModal(true);
    setCurrentAppointmentId(appointmentId);
  };
  const handleCloseDeleteAppointmentModal = () => {
    setShowDeleteAppointmentModal(false);
  };

  const appointmentColumns = getAppointmentColumns(
    handleEditClick,
    handleShowDeleteAppointmentModal
  );

  return (
    <>
      <div className="flex mx-2 lg:mx-5 my-2 lg:mt-5 px-4 lg:px-12 py-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg h-full">
        <div className="w-full flex flex-col gap-2 drop-shadow-sm">
          <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
            <Button
              size="medium"
              onClick={() => setOpenNewAppointmentModal(true)}
              className="flex items-center"
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Add A New Appointment
            </Button>
          </div>

          <div className="flex justify-between items-center gap-3 flex-wrap lg:flex-nowrap flex-col lg:flex-row">
            <MainHeading title={"Appointments"} className="mt-5"/>
            <AppointmentListFilter
              onChange={(filters) => {
                setSearch(filters?.search);
                setDateRange(filters?.dateRange);
              }}
            />
          </div>
          <div className="h-full">
            <Table
              rows={appointments}
              columns={appointmentColumns}
              isLoading={status === "loading"}
              customStyles={{ height: "100%" }}
            />
          </div>
        </div>

        {/* Dialog for adding new appointment */}
        <NewAppointmentModal
          open={openNewAppointmentModal}
          setOpen={setOpenNewAppointmentModal}
          status={status}
        />

        {/* Dialog to view appointment */}
        <EditAppointmentModal
          openViewAppointmentModal={openViewAppointmentModal}
          setOpenViewAppointmentModal={setOpenViewAppointmentModal}
          key={currentAppointment?.id}
        />

        {/* Dialog to delete appointment */}
        <DeleteAppointmentModal
          showDeleteAppointmentModal={showDeleteAppointmentModal}
          handleCloseDeleteAppointmentModal={handleCloseDeleteAppointmentModal}
          handleDeleteAppointment={handleDeleteAppointment}
          status={status}
        />
      </div>
    </>
  );
};

export default Appointments;
