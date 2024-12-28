import { userRequest } from "./requests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";


export const addBilling = async (billingData) => {
  const response = await userRequest.post("/billings/add-billing", billingData);
  return response.data;
};

export const updateBillingDiscountAmount = async ({ id, discount }) => {
  const response = await userRequest.put(`/billings/updateDiscount/${id}`, {
    discount,
  });
  return response.data;
};

// Patient
export const fetchAllPatients = async (search = "") => {
  const response = await api.get(`/patients?search=${search}`);
  return response.data;
};

// Get All Medicines
export const getAllMedicines = async (search = "") => {
  try {
    const response = await userRequest.get(`/medicines?search=${search}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Error getting medicines:", error);
    throw error;
  }
};

// Delete a Patient Medication
export const deletePatientMedication = async (id) => {
  try {
    const response = await userRequest.delete(`/patientMedications/${id}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) { 
    console.error("Error deleting medication:", error);
    throw error;
  }
};

// Get All Treatments
export const getAllTreatments = async (search = "") => {
  try {
    const response = await userRequest.get(`/treatments?search=${search}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Error getting treatments:", error);
    throw error;
  }
};

// Delete a Patient Treatment
export const deletePatientTreatment = async (id) => {
  try {
    const response = await userRequest.delete(`/patientTreatments/${id}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) { 
    console.error("Error deleting Treatment:", error);
    throw error;
  }
};

// Get All Medicines
export const getAllPackages = async (search = "") => {
  try {
    const response = await userRequest.get(`/packages?search=${search}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Error getting packages:", error);
    throw error;
  }
};

// Delete a Patient Treatment
export const deletePatientPackage = async (id) => {
  try {
    const response = await userRequest.delete(`/patientPackages/${id}`);
    if (response?.data) {
      return response?.data;
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) { 
    console.error("Error deleting Package:", error);
    throw error;
  }
};