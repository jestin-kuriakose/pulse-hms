import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const addDoctorSchema = vine.object({
  firstName: vine.string(),
  lastName: vine.string(),
  email: vine.string().email(),
  phoneNumber: vine.string().minLength(4),
  password: vine.string().minLength(6).maxLength(100),
});
