import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Accordion } from "../../../components/ui";
import { getPatientAppointments } from "../../../features/Appointments/appointmentsSlice";
import { useParams } from "react-router-dom";
import { fetchPatientConsultations } from "../../../features/Consultations/consultationSlice";

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { appointments, status } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(getPatientAppointments(id));
    dispatch(fetchPatientConsultations(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading appointments...</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments found for this patient.</div>;
  }

  const formatTime = (time) => {
    return dayjs(time, "HH:mm").format("h:mm A");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Patient Appointments</h2>
      {appointments.map((appointment) => (
        <Accordion
          key={appointment.id}
          title={`${dayjs(appointment.date).format("MMMM D, YYYY")} - Dr. ${
            appointment?.doctor?.firstName
          } ${appointment?.doctor?.lastName}`}
          className="border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Time:</strong> {formatTime(appointment.startTime)} -{" "}
                {formatTime(appointment.endTime)}
              </p>
              <p>
                <strong>Doctor:</strong> Dr. {appointment?.doctor?.firstName}{" "}
                {appointment?.doctor?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {appointment.email}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {dayjs(appointment.created_at).format("MMMM D, YYYY h:mm A")}
              </p>
            </div>
            <div>
              <p>
                <strong>Phone:</strong> {appointment.countryCode}{" "}
                {appointment.phoneNumber}
              </p>
              <p>
                <strong>Notes:</strong> {appointment.notes || "No notes"}
              </p>
            </div>
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default PatientAppointments;
