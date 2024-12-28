import api from "../../../utils/api";
import { userRequest } from "../../../utils/requests";

export const fetchAllAppointments = async ({ dateRange, search }) => {
  if (
    dateRange?.startDate === "Invalid Date" ||
    dateRange?.endDate === "Invalid Date"
  )
    return;

  const { data } = await api.get(
    `/appointments?startDate=${dateRange?.startDate}&endDate=${dateRange?.endDate}&search=${search}`
  );
  return data;
};

export const newAppointment = async (appointmentData) => {
  const { data } = await api.post("appointments", appointmentData);
  return data;
};

export const updateAppointment = async (id, appointmentData) => {
  if (!id) return;
  const { data } = await api.put(
    `/appointments/${id}`,
    appointmentData
  );
  return data;
};

export const deleteAppointment = async (id) => {
  if (!id) return;
  const { data } = await api.delete(`/appointments/${id}`);
  return data;
};

// Get all appointments of a patient
export const fetchPatientAppointmentsApi = async (id) => {
  const { data } = await api.get(`/appointments/patient/${id}`);
  return data;
};