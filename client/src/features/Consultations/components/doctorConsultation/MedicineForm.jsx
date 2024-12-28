import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ListFilter from "./ListFilter";
import MedicineTable from "../Tables/MedicineTable";
import { fetchMedicines } from "../../../Inventory/slice/medicineSlice";
import { newPatientMedication } from "../../consultationSlice";

const MedicineForm = ({ medicines, setMedicines, patientAssessmentId }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { medicineList, status } = useSelector((state) => state.medicines);

  useEffect(() => {
    dispatch(fetchMedicines(search));
  }, [search]);

  const handleMedicineAdd = (id) => {
    if (!id) return;
    const medId = Number(id);
    const foundMedicine = medicineList?.find((med) => med?.id === medId);

    // setMedicines((prev) => [
    //   ...prev,
    //   {
    //     id:
    //       medicines?.length < 1
    //         ? 1
    //         : medicines.reduce((max, item) => Math.max(max, item.id), 0) + 1,
    //     medicine: foundMedicine,
    //     quantity: 1,
    //     notes: "No Notes",
    //     newEntry: true,
    //   },
    // ]);

    dispatch(
      newPatientMedication({
        quantity: 1,
        notes: "No Notes",
        medicineId: foundMedicine.id,
        patientAssessmentId,
      })
    );
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
          key={"medicine"}
        />

        {isOpen && (
          <div className="absolute left-0 bg-white w-full border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
            {status === "loading" ? (
              <div className="flex items-center justify-center my-10">
                <CircularProgress />
              </div>
            ) : medicineList.length > 0 ? (
              medicineList.map((medicine, index) => (
                <div
                  key={index}
                  onClick={() => handleMedicineAdd(medicine?.id)}
                  className="flex flex-col border-b hover:bg-blue-100 p-3 cursor-pointer"
                >
                  <p className="font-semibold">{medicine.code}</p>
                  <p className="text-gray-700">{medicine.name}</p>
                  <p className="text-gray-500 text-sm">
                    {medicine.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: {medicine.quantity}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      <MedicineTable
        medicineList={medicineList}
        medicines={medicines}
        setMedicines={setMedicines}
        isLoading={status === "loading-medication"}
      />
    </div>
  );
};

export default MedicineForm;
