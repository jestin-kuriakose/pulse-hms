import api from "../../../utils/api";

// Consultation API calls
export const fetchConsultations = async (data) => {
  if (
    data?.dateRange?.startDate === "Invalid Date" ||
    data?.dateRange?.endDate === "Invalid Date"
  )
    return;
  const response = await api.get(
    `/consultations?startDate=${data?.dateRange?.startDate}&endDate=${data?.dateRange?.endDate}&search=${data?.search}`
  );
  return response.data;
};
/**
 * Fetch a single consultation by ID
 * @param {string} id - Consultation ID
 * @returns {Promise<Object>} Consultation data
 */
export const getSingleConsultation = async (id) => {
  const response = await api.get(`/consultations/${id}`);
  return response.data;
};

// Fetch all consultations of a patient
export const getPatientConsultationsApi = async (id) => {
  const response = await api.get(`/consultations/patient/${id}`);
  return response.data;
};

/**
 * Create a new consultation
 * @param {Object} data - Consultation data
 * @returns {Promise<Object>} Created consultation data
 */
export const createNewConsultation = async (data) => {
  const response = await api.post("/consultations", data);
  return response.data;
};

/**
 * Update an existing patient assessment
 * @param {string} id - Patient ID
 * @param {string} consultId - Consultation ID
 * @param {Object} data - Updated consultation data
 * @returns {Promise<Object>} Updated consultation data
 */
export const updateExistingPatientAssessment = async (id, consultId, data) => {
  const response = await api.put(
    `/consultations/patientAssessment/${id}?consultId=${consultId}`,
    data
  );
  return response.data;
};

/**
 * Update patient triage by ID
 * @param {string} triageId - Triage ID
 * @param {string} consultId - Consultation ID
 * @param {Object} triageData - Updated triage data
 * @returns {Promise<Object>} Updated triage data
 */
export const updatePatientTriageById = async (
  triageId,
  consultId,
  triageData
) => {
  const response = await api.put(
    `/consultations/patientTriage/${triageId}?consultId=${consultId}`,
    triageData
  );
  return response.data;
};

// Note API calls
/**
 * Create a new patient triage note
 * @param {Object} body - Note data
 * @returns {Promise<Object>} Created note data
 */
export const createNewPatientTriageNote = async (body) => {
  const response = await api.post("/notes/patient-triage", body);
  return response.data;
};

/**
 * Create a new patient assessment note
 * @param {Object} body - Note data
 * @returns {Promise<Object>} Created note data
 */
export const createNewPatientAssessmentNote = async (body) => {
  const response = await api.post("/notes/patient-assessment", body);
  return response.data;
};

export const createNewPatientMedicationApi = async (body) => {
  const response = await api.post("/patientMedications", body);
  return response.data;
};

export const updateExistingPatientMedicationApi = async (id, data) => {
  const response = await api.put(`/patientMedications/${id}`, data);
  return response.data;
};

export const deletePatientMedicationApi = async (id) => {
  const response = await api.delete(`/patientMedications/${id}`);
  return response.data;
}

export const createNewPatientTreatmentApi = async (body) => {
  const response = await api.post("/patientTreatments", body);
  return response.data;
};

export const updateExistingPatientTreatmentApi = async (id, data) => {
  const response = await api.put(`/patientTreatments/${id}`, data);
  return response.data;
};

export const deletePatientTreatmentApi = async (id) => {
  const response = await api.delete(`/patientTreatments/${id}`);
  return response.data;
}

export const createNewPatientPackageApi = async (body) => {
  const response = await api.post("/patientPackages", body);
  return response.data;
};

export const updateExistingPatientPackageApi = async (id, data) => {
  const response = await api.put(`/patientPackages/${id}`, data);
  return response.data;
};

export const deletePatientPackageApi = async (id) => {
  const response = await api.delete(`/patientPackages/${id}`);
  return response.data;
}

export const createNewPatientItemApi = async (body) => {
  const response = await api.post("/patientItems", body);
  return response.data;
};

export const updateExistingPatientItemApi = async (id, data) => {
  const response = await api.put(`/patientItems/${id}`, data);
  return response.data;
};

export const deletePatientItemApi = async (id) => {
  const response = await api.delete(`/patientItems/${id}`);
  return response.data;
}