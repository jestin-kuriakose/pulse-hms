import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const appointmentSchema = vine.object({
  firstName: vine.string().minLength(2),
  lastName: vine.string().minLength(2),
  email: vine.string().email(),
  countryCode: vine.string(4),
  phoneNumber: vine.string().minLength(4),
  date: vine.string(),
  startTime: vine.string(),
  endTime: vine.string(),
  doctorId: vine.number(),
  patientId: vine.number(),
  notes: vine.string(),
});
