import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Accordion } from "../../../components/ui";
import { fetchPatientConsultations } from "../../../features/Consultations/consultationSlice";

const PatientConsultations = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { consultationList, status } = useSelector(
    (state) => state.consultations
  );
  console.log(consultationList);
  useEffect(() => {
    dispatch(fetchPatientConsultations(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading consultations...</div>;
  }

  if (!consultationList || consultationList?.length === 0) {
    return <div>No consultations found for this patient.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Patient Consultations</h2>
      {consultationList?.map((consultation) => (
        <Accordion
          key={consultation.id}
          title={`${dayjs(consultation.created_at).format(
            "MMMM D, YYYY h:mm A"
          )} - ${consultation.status}`}
          className="border-gray-200 dark:border-gray-700"
          contentClassName="max-h-[70vh] overflow-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Consultation Details
              </h3>
              <p>
                <strong>Status:</strong> {consultation.status || ""}
              </p>
              <p>
                <strong>Doctor:</strong>{" "}
                {consultation.doctor?.position === "DOCTOR" ? "Dr." : ""}{" "}
                {consultation.doctor?.firstName} {consultation.doctor?.lastName}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {dayjs(consultation.created_at).format("MMMM D, YYYY h:mm A")}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {dayjs(consultation.updated_at).format("MMMM D, YYYY h:mm A")}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Triage Information</h3>
              <p>
                <strong>Priority:</strong> {consultation?.patientTriage?.priority || ""}
              </p>
              <p>
                <strong>Systolic:</strong> {consultation?.patientTriage?.systolic || ""}
              </p>
              <p>
                <strong>Diastolic:</strong>{" "}
                {consultation?.patientTriage?.diastolic || ""}
              </p>
              <p>
                <strong>Temperature:</strong>{" "}
                {consultation?.patientTriage?.temperature || ""}
              </p>
              <p>
                <strong>Height:</strong> {consultation?.patientTriage?.height || ""}
              </p>
              <p>
                <strong>Weight:</strong> {consultation.patientTriage?.weight || ""}
              </p>
              <p>
                <strong>SpO2:</strong> {consultation?.patientTriage?.spO2 || ""}
              </p>
              <p>
                <strong>BMI:</strong> {consultation?.patientTriage?.bmi || ""}
              </p>
              <p>
                <strong>Pulse:</strong> {consultation?.patientTriage?.pulse || ""}
              </p>
              <p>
                <strong>Pain Scale:</strong>{" "}
                {consultation?.patientTriage?.painScale || ""}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            {consultation?.patientTriage?.notes
              .concat(consultation?.patientAssessment?.notes)
              .map((note) => (
                <div
                  key={note.id}
                  className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <p>
                    <strong>{note?.noteType}:</strong> {note.content}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By {note.employee.firstName} {note.employee.lastName} on{" "}
                    {dayjs(note.createdAt).format("MMMM D, YYYY h:mm A")}
                  </p>
                </div>
              ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default PatientConsultations;
