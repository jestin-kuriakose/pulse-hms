import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
vine.errorReporter = () => new CustomErrorReporter();

export const addBillingSchema = vine.object({
  patientId: vine.number(),
  doctorId: vine.number(),
  total: vine.number(),
  serviceProvided: vine.string(),
  tax: vine.number(),
  discount: vine.number(),
  previousBalance: vine.number(),
  paymentMade: vine.number(),
});
