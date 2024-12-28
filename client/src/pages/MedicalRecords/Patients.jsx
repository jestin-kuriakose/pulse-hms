import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainHeading, Table } from "../../components/ui";
import { fetchPatients } from "../../features/MedicalRecords/patientsSlice";
import PatientListFilter from "../../features/MedicalRecords/components/Patients/PatientListFilter";
import { Link } from "react-router-dom";

const Patients = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { patientList, status } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients(search));
  }, [dispatch, search]);

  const columns = [
    { field: "mrNumber", headerName: "MR Number", width: 120, renderCell: (params) => {
      return <Link to={`/medical-records/${params.row.id}`} className="font-semibold text-sec-600">{params.row.mrNumber}</Link>
    } },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "dob", headerName: "Date of Birth", width: 120 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "nationality", headerName: "Nationality", width: 120 },
    { field: "maritalStatus", headerName: "Marital Status", width: 120 },
    { field: "emirate", headerName: "Emirate", width: 120 },
    { field: "visaType", headerName: "Visa Type", width: 120 },
    { field: "nationalID", headerName: "National ID", width: 150 },
    { field: "emergencyContactName", headerName: "Emergency Contact", width: 180 },
    { field: "emergencyContactNumber", headerName: "Emergency Number", width: 180 },
    { field: "allergies", headerName: "Allergies", width: 150 },
  ];
console.log(patientList)
  return (
    <div className="flex mx-2 lg:mx-5 my-2 lg:mt-5 px-4 lg:px-12 py-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg h-full">
      <div className="w-full flex flex-col gap-2 drop-shadow-sm">
        <div className="flex md:flex-row flex-col items-start md:items-center md:justify-between">
          <MainHeading title="Patient Records" />
          <PatientListFilter
            onChange={(filters) => {
              setSearch(filters?.search);
            }}
          />
        </div>
        <div className="h-full mt-4">
          <Table
            rows={patientList}
            columns={columns}
            isLoading={status === "loading"}
          />
        </div>
      </div>
    </div>
  );
};

export default Patients;
