import React, { useEffect } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MainHeading } from "../../../components/ui";
import { fetchSinglePatient } from "../../../features/MedicalRecords/patientsSlice";

const SinglePatient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentPatient, status } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchSinglePatient(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (!currentPatient) {
    return (
      <div className="flex justify-center items-center h-full">
        Patient not found
      </div>
    );
  }

  const tabs = [
    { label: "Overview", path: "overview" },
    { label: "Appointments", path: "appointments" },
    { label: "Consultations", path: "consultations" },
    { label: "Billings", path: "billings" },
  ];

  return (
    <div className="flex flex-col mx-2 lg:mx-5 my-2 lg:mt-5 px-4 lg:px-12 py-6 lg:py-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg h-full">
      <MainHeading
        title={`Patient: ${currentPatient.firstName} ${currentPatient.middleName} ${currentPatient.lastName}`}
        className="text-xl lg:text-2xl mb-4"
      />

      <div className="whitespace-nowrap mb-6 overflow-x-scroll">
        <nav className="flex space-x-2">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-3 py-2 text-sm lg:text-base rounded-lg transition-colors ${
                location.pathname.includes(tab.path)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};



export default SinglePatient;
