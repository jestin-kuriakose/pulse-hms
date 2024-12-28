import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const triageSchema = vine.object({
  status: vine.string().optional(),
  priority: vine.string().optional(),
  startTime: vine.string().optional(),
  endTime: vine.string().optional(),
  immunizationUpToDate: vine.string().optional(),
  immunizationRemarks: vine.string().optional(),
  allergenHistory: vine.string().optional(),
  systolic: vine.string().optional(),
  diastolic: vine.string().optional(),
  temperature: vine.string().optional(),
  height: vine.string().optional(),
  weight: vine.string().optional(),
  spO2: vine.string().optional(),
  bmi: vine.string().optional(),
  pulse: vine.string().optional(),
  painScale: vine.number().optional(),
  pastMedicalHistory: vine.string().optional(),
  familyHistory: vine.string().optional(),
  socialHistory: vine.string().optional(),
  surgicalHistory: vine.string().optional(),
  currentHistory: vine.string().optional(),

  creams: vine.string().optional(),
  nurseAssessment: vine.string().optional(),
  medications: vine.string().optional(),
  otherNotes: vine.string().optional(),
  allergies: vine
    .array(
      vine.object({
        type: vine.string().optional(),
        allergy: vine.string().optional(),
        reaction: vine.string().optional(),
        st: vine.string().optional().optional(),
        se: vine.string().optional().optional(),
      })
    )
    .optional(),
  problems: vine.array(vine.string()).optional(),
});
