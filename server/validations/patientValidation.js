import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const patientRegistrationSchema = vine.object({
  firstName: vine.string().minLength(1),
  middleName: vine.string().optional(),
  lastName: vine.string().minLength(1),
  nationality: vine.string().optional(),
  maritalStatus: vine.string().optional(),
  dob: vine.string().optional(),
  gender: vine.string().optional(),
  source: vine.string().optional(),
  email: vine.string().email(),
  countryCode: vine.string(),
  phoneNumber: vine.string().minLength(4),
  address: vine.string().optional(),
  district: vine.string().optional(),
  emirate: vine.string().optional(),
  country: vine.string().optional(),
  visaType: vine.string().optional(),
  nationalID: vine.string().optional(),
  otherID: vine.string().optional(),
  emergencyContactNumber: vine.string().optional(),
  emergencyContactName: vine.string().optional(),
  emergencyContactRelationship: vine.string().optional(),
  allergies: vine.string(),
  profilePicture: vine.string().optional(),
  doctorId: vine.number(),
  appointmentId: vine.number().optional(),
});
