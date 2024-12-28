import api from "../../../utils/api";

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error("API call failed:", error);
  throw error.response ? error.response.data : error;
};

// Medicine API calls
export const fetchMedicinesApi = async (search) =>
  api.get("/medicines?search=" + search || "").then(handleResponse).catch(handleError);

export const fetchSingleMedicineApi = async (id) =>
  api.get(`/medicines/${id}`).then(handleResponse).catch(handleError);

export const addMedicineApi = async (data) =>
  api.post("/medicines", data).then(handleResponse).catch(handleError);

export const editMedicineApi = async (id, data) =>
  api.put(`/medicines/${id}`, data).then(handleResponse).catch(handleError);

export const deleteMedicineApi = async (id) =>
  api.delete(`/medicines/${id}`).then(handleResponse).catch(handleError);

// Package API calls
export const fetchPackagesApi = async (search) =>
  api.get("/packages?search=" + search || "").then(handleResponse).catch(handleError);

export const fetchSinglePackageApi = async (id) =>
  api.get(`/packages/${id}`).then(handleResponse).catch(handleError);

export const addPackageApi = async (data) =>
  api.post("/packages", data).then(handleResponse).catch(handleError);

export const editPackageApi = async (id, data) =>
  api.put(`/packages/${id}`, data).then(handleResponse).catch(handleError);

export const deletePackageApi = async (id) =>
  api.delete(`/packages/${id}`).then(handleResponse).catch(handleError);

// Treatment API calls
export const fetchTreatmentsApi = async (search) =>
  api.get("/treatments?search=" + search || "").then(handleResponse).catch(handleError);

export const fetchSingleTreatmentApi = async (id) =>
  api.get(`/treatments/${id}`).then(handleResponse).catch(handleError);

export const addTreatmentApi = async (data) =>
  api.post("/treatments", data).then(handleResponse).catch(handleError);

export const editTreatmentApi = async (id, data) =>
  api.put(`/treatments/${id}`, data).then(handleResponse).catch(handleError);

export const deleteTreatmentApi = async (id) =>
  api.delete(`/treatments/${id}`).then(handleResponse).catch(handleError);

// Item API calls
export const fetchItemsApi = async (search) =>
  api.get("/items?search=" + search || "").then(handleResponse).catch(handleError);

export const fetchSingleItemApi = async (id) =>
  api.get(`/items/${id}`).then(handleResponse).catch(handleError);

export const addItemApi = async (data) =>
  api.post("/items", data).then(handleResponse).catch(handleError);

export const editItemApi = async (id, data) =>
  api.put(`/items/${id}`, data).then(handleResponse).catch(handleError);

export const deleteItemApi = async (id) =>
  api.delete(`/items/${id}`).then(handleResponse).catch(handleError);

// Category API calls
export const fetchCategoriesApi = async () =>
  api.get("/categories").then(handleResponse).catch(handleError);

export const fetchSingleCategoryApi = async (id) =>
  api.get(`/categories/${id}`).then(handleResponse).catch(handleError);

export const addCategoryApi = async (data) =>
  api.post("/categories", data).then(handleResponse).catch(handleError);

export const editCategoryApi = async (id, data) =>
  api.put(`/categories/${id}`, data).then(handleResponse).catch(handleError);

export const deleteCategoryApi = async (id) =>
  api.delete(`/categories/${id}`).then(handleResponse).catch(handleError);

// Supplier API calls
export const fetchSuppliersApi = async () =>
  api.get("/suppliers").then(handleResponse).catch(handleError);

export const fetchSingleSupplierApi = async (id) =>
  api.get(`/suppliers/${id}`).then(handleResponse).catch(handleError);

export const addSupplierApi = async (data) =>
  api.post("/suppliers", data).then(handleResponse).catch(handleError);

export const editSupplierApi = async (id, data) =>
  api.put(`/suppliers/${id}`, data).then(handleResponse).catch(handleError);

export const deleteSupplierApi = async (id) =>
  api.delete(`/suppliers/${id}`).then(handleResponse).catch(handleError);