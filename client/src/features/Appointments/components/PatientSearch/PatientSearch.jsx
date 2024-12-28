import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import SearchFilter from "../SearchFilter/SearchFilter";
import { fetchPatients } from "../../../MedicalRecords/patientsSlice";

const PatientSearch = ({
  onSelectPatient,
  required = false,
  errors = null,
}) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const dispatch = useDispatch();
  const { patientList, status } = useSelector((state) => state.patients);

  const handleSearch = (search) => {
    if (search.length < 1) return;
    dispatch(fetchPatients(search));
  };

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    onSelectPatient(patient);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const renderResults = (onSelect) => {
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center my-10">
          <CircularProgress />
        </div>
      );
    }

    if (patientList?.length === 0) {
      return <div className="p-3 text-gray-500">No results found</div>;
    }

    return patientList?.map((patient, index) => (
      <div
        key={index}
        onClick={() => onSelect(patient)}
        className="flex flex-col border-b bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-blue-50 p-4 cursor-pointer transition duration-150 ease-in-out"
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {patient.firstName} {patient.lastName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-100">
            {patient.mrNumber}
          </p>
        </div>
        <div className="text-sm mt-1 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            {patient.email} | {patient.phoneNumber}
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-medium">
              {calculateAge(patient.dob)}
            </span>
            <span
              className={`font-medium ${
                patient.gender === "Male" ? "text-blue-500" : "text-pink-500"
              }`}
            >
              {patient.gender === "Male" ? "M" : "F"}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="mt-2 w-full">
      <SearchFilter
        onSearch={handleSearch}
        placeholder="Search patients by name or ID"
        renderResults={renderResults}
        onSelect={handleSelect}
        required={required}
        errors={errors}
      />
      {selectedPatient && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-300">
            Patient:
          </h3>
          <p className="text-gray-900 dark:text-gray-300">
            {selectedPatient.firstName} {selectedPatient.lastName} (
            {selectedPatient.mrNumber})
          </p>
          <p className="text-gray-900 dark:text-gray-400 text-sm mt-1">
            {selectedPatient.email} | {selectedPatient.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
