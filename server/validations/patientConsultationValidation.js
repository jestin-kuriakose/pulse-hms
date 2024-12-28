import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const addPatientConsultationSchema = vine.object({
  visitType: vine.string().optional(),
  consultationType: vine.string().optional(),
  complaints: vine.string().optional(),
  laser_q_note: vine.string().optional(),
  facial_dermapen_prp: vine.string().optional(),
  slimming_note: vine.string().optional(),
  prescription: vine.string().optional(),
  instructions: vine.string().optional(),
  recommendations: vine.string().optional(),
  provider_notes: vine.string().optional(),
  status: vine.string().optional(),
});
