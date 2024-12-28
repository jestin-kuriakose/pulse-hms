import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  Menu } from "@mui/icons-material";
import { CircularProgress, Drawer, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToReadable } from "../../features/Consultations/utils/dateUtils";
import DoctorConsultation from "../../features/Consultations/components/doctorConsultation/DoctorConsultationTab";
import NurseTriage from "../../features/Consultations/components/nurseTriage/NurseTriageTab";
import { fetchConsultationById } from "../../features/Consultations/consultationSlice";

const SingleConsultation = () => {
  const { id } = useParams();
  const { currentConsultation, status } = useSelector(
    (state) => state.consultations
  );
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("Triage/Nurse Assessment");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchConsultationById(id));
    }
  }, [dispatch, id]);

  const tabs = [{ name: "Triage/Nurse Assessment" }, { name: "Consultation" }];

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
  };

  if (status === "loading")
    return (
      <div className="w-full h-screen flex items-center justify-center text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <CircularProgress />
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Drawer for Consultation List */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-80 h-full flex flex-col bg-gray-50 dark:bg-gray-800">
          <div className="bg-pry p-4">
            <h5 className="text-xl font-bold text-white">Consultation List</h5>
          </div>
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              <h6 className="text-sm font-semibold text-gray-600 dark:text-white mb-2">
                Current Consultation
              </h6>
              <div
                className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm p-4 ${
                  currentConsultation?.id === id ? "border-l-4 border-pry" : ""
                }`}
              >
                <p className="text-lg font-semibold text-pry dark:text-blue-400">
                  {formatDateToReadable(currentConsultation?.created_at)}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    ID: {currentConsultation?.id}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {currentConsultation?.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">
                  Assigned to Dr. {currentConsultation?.doctor?.user?.firstName}{" "}
                  {currentConsultation?.doctor?.user?.lastName}
                </p>
              </div>
            </div>

            <div className="px-4 pt-4">
              <h6 className="text-sm font-semibold text-gray-600 dark:text-white mb-2">
                Past Visits
              </h6>
            </div>
            <div className="px-4 pb-4 space-y-3 overflow-y-auto max-h-[calc(100vh-250px)]">
              {currentConsultation?.otherConsultations?.length > 0 ? (
                currentConsultation.otherConsultations.map((visit, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-sm p-4 hover:bg-gray-100 transition duration-300"
                  >
                    <p className="text-lg font-semibold text-pry dark:text-blue-400">
                      {formatDateToReadable(visit.created_at)}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        ID: {visit.id}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {visit.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-200 mt-2">
                      Assigned to Dr. {visit.doctor.user.firstName}{" "}
                      {visit.doctor.user.lastName}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-white  py-4">No Past Visits</p>
              )}
            </div>
          </div>
        </div>
      </Drawer>

      {/* Main Content */}
      <div className="w-full  lg:flex flex-col p-4 ">
        {/* Patient Info */}
        <div className="flex gap-4 items-start mb-6">
          {/* Toggle Drawer Button for Small Screens */}
          <IconButton onClick={() => setDrawerOpen(true)} className="lg:hidden">
            <Menu />
          </IconButton>

          {/* Patient Details */}
          <div className="flex items-center justify-center align-middle w-full">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-pry dark:text-gray-100 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {currentConsultation.patient.firstName[0]}
                  {currentConsultation.patient.lastName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-pry dark:text-gray-100">{`${currentConsultation.patient.firstName} ${currentConsultation.patient.lastName}`}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentConsultation.patient.mrNumber}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(
                      currentConsultation.patient.dob
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">
                    {currentConsultation.patient.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{`${currentConsultation.patient.countryCode} ${currentConsultation.patient.phoneNumber}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">
                    {currentConsultation.patient.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nationality</p>
                  <p className="font-medium">
                    {currentConsultation.patient.nationality}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{`${currentConsultation.patient.address}, ${currentConsultation.patient.district}, ${currentConsultation.patient.emirate}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <p className="font-medium">
                    {currentConsultation.patient.allergies || "None"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-medium capitalize">
                    {currentConsultation.patient.source}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleSelectedTab(tab.name)}
              className={`px-4 py-2 ${
                selectedTab === tab.name
                  ? "border-b-pry dark:border-b-blue-300 border-b-[3px] text-pry dark:text-blue-300"
                  : "text-gray-500 dark:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto h-screen">
          {selectedTab === "Triage/Nurse Assessment" && (
            <NurseTriage currentConsultation={currentConsultation} />
          )}
          {selectedTab === "Consultation" && (
            <DoctorConsultation patientId={currentConsultation.patientId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleConsultation;
