import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import appointmentsReducer from "../features/Appointments/appointmentsSlice";
import consultationsReducer from "../features/Consultations/consultationSlice";
import billingReducer from "../features/Billing/billingSlice";
import patientsReducer from "../features/MedicalRecords/patientsSlice";
import medicineReducer from "../features/Inventory/slice/medicineSlice";
import treatmentReducer from "../features/Inventory/slice/treatmentSlice";
import packageReducer from "../features/Inventory/slice/packageSlice";
import itemReducer from "../features/Inventory/slice/itemSlice";
import categoryReducer from "../features/Inventory/slice/categorySlice";
import supplierReducer from "../features/Inventory/slice/supplierSlice";
import employeeReducer from "../features/Employees/employeeSlice"

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
      "auth",
      "consultations",
      "appointments",
      "patients",
      "billing",
      "medicines",
      "treatments",
      "packages",
      "items",
      "singleBilling",
      "employees",
      "categories",
      "suppliers"
    ],
  };
  
  const rootReducer = combineReducers({
    appointments: appointmentsReducer,
    consultations: consultationsReducer,
    patients: patientsReducer,
    billing: billingReducer,
    employees: employeeReducer,
    medicines: medicineReducer,
    treatments: treatmentReducer,
    packages: packageReducer,
    items: itemReducer,
    categories: categoryReducer,
    suppliers: supplierReducer,
    auth: authReducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);

  // export const configureAppStore = () => {
  //   const store = configureStore({
  //     reducer: persistedReducer,
  //   });
    
  //   const persistor = persistStore(store);
    
  //   return { store, persistor };
  // };