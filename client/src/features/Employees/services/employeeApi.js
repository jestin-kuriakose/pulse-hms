import api from "../../../utils/api";

// Helper functions for API responses
const handleResponse = (response) => response.data;
const handleError = (error) => {
  console.error("API call failed:", error);
  throw error.response ? error.response.data : error;
};

/**
 * Employee API functions
 * Each function corresponds to a specific API endpoint and operation
 */

/**
 * Fetch all employees
 * @returns {Promise} Promise resolving to an array of employees
 */
export const fetchEmployeesApi = () =>
  api.get("/employees").then(handleResponse).catch(handleError);

/**
 * Fetch a single employee by ID
 * @param {string} id - The ID of the employee to fetch
 * @returns {Promise} Promise resolving to the employee data
 */
export const fetchEmployeeById = (id) =>
  api.get(`/employees/${id}`).then(handleResponse).catch(handleError);

/**
 * Add a new employee
 * @param {Object} employeeData - The data for the new employee
 * @returns {Promise} Promise resolving to the newly created employee data
 */
export const addEmployee = (employeeData) =>
  api.post("/employees", employeeData).then(handleResponse).catch(handleError);

/**
 * Update an existing employee
 * @param {string} id - The ID of the employee to update
 * @param {Object} employeeData - The updated data for the employee
 * @returns {Promise} Promise resolving to the updated employee data
 */
export const updateEmployee = (id, employeeData) =>
  api
    .put(`/employees/${id}`, employeeData)
    .then(handleResponse)
    .catch(handleError);

/**
 * Delete an employee
 * @param {string} id - The ID of the employee to delete
 * @returns {Promise} Promise resolving to the deletion confirmation
 */
export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`).then(handleResponse).catch(handleError);

/**
 * Fetch an employee's schedule
 * @param {string} employeeId - The ID of the employee
 * @param {string} startDate - The start date of the schedule period
 * @param {string} endDate - The end date of the schedule period
 * @returns {Promise} Promise resolving to the employee's schedule
 */
export const fetchEmployeeSchedule = (employeeId, startDate, endDate) =>
  api
    .get(`/employees/${employeeId}/schedule`, {
      params: { startDate, endDate },
    })
    .then(handleResponse)
    .catch(handleError);

/**
 * Save an employee's schedule
 * @param {string} employeeId - The ID of the employee
 * @param {Object} schedule - The schedule data to save
 * @returns {Promise} Promise resolving to the saved schedule data
 */
export const saveEmployeeSchedule = (employeeId, schedule) =>
  api
    .post(`/employees/${employeeId}/schedule`, { schedule })
    .then(handleResponse)
    .catch(handleError);

export const updateEmployeeSchedule = (employeeId, scheduleId, schedule) =>
  api
    .put(`/employees/${employeeId}/schedule/${scheduleId}`, { schedule })
    .then(handleResponse)
    .catch(handleError);

export const deleteEmployeeSchedule = (employeeId, scheduleId) =>
  api
    .delete(`/employees/${employeeId}/schedule/${scheduleId}`)
    .then(handleResponse)
    .catch(handleError);

export const fetchEmployeeAuditLogs = (employeeId) =>
  api
    .get(`/employees/${employeeId}/audit-logs`)
    .then(handleResponse)
    .catch(handleError);
