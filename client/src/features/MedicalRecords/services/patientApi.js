import api from "../../../utils/api";

const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error("API call failed:", error);
  throw error.response ? error.response.data : error;
};

export const fetchPatientsApi = async (search) =>
  api.get(`/patients?search=${search || ""}`).then(handleResponse).catch(handleError);

export const fetchSinglePatientApi = async (id) => 
  api.get(`/patients/${id}`).then(handleResponse).catch(handleError);