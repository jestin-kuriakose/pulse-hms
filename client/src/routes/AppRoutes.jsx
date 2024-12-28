import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import RootLayout from "../components/layouts/RootLayout";
import {
  AddEmployee,
  Appointments,
  Billing,
  Consultations,
  Dashboard,
  Departments,
  EditEmployee,
  Employees,
  Login,
  Registration,
  Settings,
  SingleBilling,
  SingleConsultation,
  SingleEmployee,
  Unauthorized,
} from "../pages";
import Inventory from "../pages/Admin/Inventory/Inventory";
import Medicines from "../pages/Admin/Inventory/Medicines";
import Packages from "../pages/Admin/Inventory/Packages";
import Treatments from "../pages/Admin/Inventory/Treatments";
import Items from "../pages/Admin/Inventory/Items";
import Patients from "../pages/MedicalRecords/Patients";
import SinglePatient from "../pages/MedicalRecords/SinglePatient/SinglePatient";
import PatientAppointments from "../pages/MedicalRecords/SinglePatient/PatientAppointments";
import PatientConsultations from "../pages/MedicalRecords/SinglePatient/PatientConsultations";
import PatientOverview from "../pages/MedicalRecords/SinglePatient/PatientOverview";

const createAppRoutes = (user) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute user={user} />,
      children: [
        {
          path: "/",
          element: <RootLayout />,
          children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "consultations", element: <Consultations /> },
            { path: "consultations/:id", element: <SingleConsultation /> },
            { path: "settings", element: <Settings /> },
            { path: "appointments", element: <Appointments /> },
            { path: "departments", element: <Departments /> },
            { path: "employees", element: <Employees /> },
            { path: "employees/:id", element: <SingleEmployee /> },
            { path: "employees/add", element: <AddEmployee /> },
            { path: "employees/edit/:id", element: <EditEmployee /> },
            { path: "registration", element: <Registration /> },
            { path: "billing", element: <Billing /> },
            { path: "billing/:id", element: <SingleBilling /> },
            { path: "medical-records", element: <Patients /> },
            { 
              path: "medical-records/:id", 
              element: <SinglePatient />,
              children: [
                { index: true, element: <Navigate to="overview" replace /> },
                { path: "overview", element: <PatientOverview/>},
                { path: "consultations", element: <PatientConsultations /> },
                { path: "appointments", element: <PatientAppointments /> },
              ]
            },
            
            {
              path: "admin/inventory",
              element: <Inventory />,
              children: [
                { index: true, element: <Navigate to="medicines" replace /> },
                { path: "medicines", element: <Medicines /> },
                { path: "packages", element: <Packages /> },
                { path: "items", element: <Items /> },
                { path: "treatments", element: <Treatments/> },
              ],
            },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
};

export default createAppRoutes;
