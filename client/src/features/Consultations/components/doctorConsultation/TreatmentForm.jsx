import React, { useEffect, useState } from "react";
import ListFilter from "./ListFilter";
import { useDispatch, useSelector } from "react-redux";
import TreatmentTable from "../Tables/TreatmentTable";
import { fetchTreatments } from "../../../Inventory/slice/treatmentSlice";

const TreatmentForm = ({ treatments, setTreatments }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { treatmentList, status } = useSelector((state) => state.treatments);

  useEffect(() => {
    dispatch(fetchTreatments(search));
  }, [search]);

  const handleTreatmentAdd = (id) => {
    if (!id) return;
    const treatId = Number(id);
    const foundTreatment = treatmentList?.find(
      (treat) => treat?.id === treatId
    );
    setTreatments((prev) => [
      ...prev,
      {
        id: treatments?.length + 1,
        treatment: foundTreatment,
        quantity: 1,
        notes: "No Notes",
        newEntry: true,
      },
    ]);
  };

  return (
    <div className="mt-2 px-4 w-full">
      <div className="mb-2 relative">
        <ListFilter
          onChange={(filters) => {
            setSearch(filters?.search);
          }}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          key={"treatment"}
        />

        {isOpen && (
          <div className="absolute left-0 bg-white w-full border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
            {status === "loading" ? (
              <div className="flex items-center justify-center my-10">
                <CircularProgress />
              </div>
            ) : treatmentList.length > 0 ? (
              treatmentList.map((treatment, index) => (
                <div
                  key={index}
                  onClick={() => handleTreatmentAdd(treatment?.id)}
                  className="flex flex-col border-b hover:bg-blue-100 p-3 cursor-pointer"
                >
                  <p className="font-semibold">{treatment.code}</p>
                  <p className="text-gray-700">{treatment.name}</p>
                  <p className="text-gray-500 text-sm">
                    {treatment.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {treatment.quantity}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      <TreatmentTable
        treatmentList={treatmentList}
        treatments={treatments}
        setTreatments={setTreatments}
      />
    </div>
  );
};

export default TreatmentForm;
