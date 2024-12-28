import { useState } from "react";
import CustomModal from "../common/CustomModal";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export const DeletePatientModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  employee,
  handleDeleteEmployee
}) => {
  const status = useSelector((state) => state.employees.status);
console.log(employee)
  return (
    <CustomModal
      isOpen={isDeleteModalOpen}
      onRequestClose={() => setIsDeleteModalOpen(false)}
      contentLabel={"Delete Employee"}
    >
      <h2 className="text-2xl font-bold mb-4">
        Delete Employee
      </h2>

      <p>Are you sure you want to delete employee - {employee?.user?.firstName} {employee?.user?.lastName} ?</p>

      <div className="flex justify-end mt-2">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDeleteEmployee(employee?.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          disabled={status === "loading"}
        >
          {status === "loading" ? <CircularProgress /> : "Delete"}
        </button>
      </div>
    </CustomModal>
  );
};
