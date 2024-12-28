import express from "express";
import "dotenv/config";
import AuthRoutes from "./routes/auth.js";
import PatientRoutes from "./routes/patients.js";
import DoctorRoutes from "./routes/doctors.js";
import AppointmentRoutes from "./routes/appointments.js";
import ConsultationRoutes from "./routes/consultations.js";
import PatientMedicationRoutes from "./routes/patientMedication.js";
import PatientTreatmentRoutes from "./routes/patientTreatment.js";
import PatientPackageRoutes from "./routes/patientPackage.js";
import PatientItemRoutes from "./routes/patientItem.js";
import AvailabilityRoutes from "./routes/availability.js";
import BillingRoutes from "./routes/billing.js";
import EmployeeRoutes from "./routes/employee.js";
import MedicineRoutes from "./routes/medicine.js";
import PackageRoutes from "./routes/package.js";
import TreatmentRoutes from "./routes/treatment.js";
import PaymentRoutes from "./routes/payments.js";
import ItemRoutes from "./routes/items.js";
import NotesRoutes from "./routes/notes.js";
import SupplierRoutes from "./routes/supplier.js";
import CategoryRoutes from "./routes/category.js";
import devInitializeRouter from './routes/developerInitialize.js';
import helmet from "helmet";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors({
//   origin: 'https://pulse.sintamedicalcenter.ae',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.get("/api/info", (req, res) => {
  return res.json({ message: "This API works" });
});
app.post("/api/info", (req, res) => {
  const body = req?.body
  return res.json({ message: "This POST API works", body });
});

app.use('/api/dev', devInitializeRouter);
app.use("/api/auth", AuthRoutes);
app.use("/api/patients", PatientRoutes);
app.use("/api/doctors", DoctorRoutes);
app.use("/api/appointments", AppointmentRoutes);
app.use("/api/availability", AvailabilityRoutes);
app.use("/api/consultations", ConsultationRoutes);
app.use("/api/billings", BillingRoutes);
app.use("/api/employees", EmployeeRoutes);
app.use("/api/notes", NotesRoutes)
app.use("/api/suppliers", SupplierRoutes);
app.use("/api/categories", CategoryRoutes);

app.use("/api/patientMedications", PatientMedicationRoutes);
app.use("/api/patientTreatments", PatientTreatmentRoutes);
app.use("/api/patientPackages", PatientPackageRoutes);
app.use("/api/patientItems", PatientItemRoutes);

app.use("/api/medicines", MedicineRoutes);
app.use("/api/packages", PackageRoutes);
app.use("/api/treatments", TreatmentRoutes);
app.use("/api/items", ItemRoutes);

app.use("/api/payments", PaymentRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
