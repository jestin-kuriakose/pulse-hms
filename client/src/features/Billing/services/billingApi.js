import api from "../../../utils/api";

const handleResponse = (response) => response.data;
const handleError = (error) => error.response.data;

export const fetchBillings = async ({ search, dateRange }) =>
  api
    .get(
      `/billings?startDate=${dateRange?.startDate}&endDate=${dateRange?.endDate}&search=${search}`
    )
    .then(handleResponse)
    .catch(handleError);

export const fetchSingleBilling = async (id) =>
  api.get(`/billings/${id}`).then(handleResponse).catch(handleError);

export const updateBillingStatus = async (id) =>
  api
    .get(`/billings/updateStatus/${id}`)
    .then(handleResponse)
    .catch(handleError);

export const updateBillingDiscountAmount = async ({ id, discount }) =>
  api
    .put(`/billings/updateDiscount/${id}`, { discount })
    .then(handleResponse)
    .catch(handleError);

export const addNewBilling = async (data) =>
  api.post("/billings", data).then(handleResponse).catch(handleError);

export const addBillPayment = async ({ billingId, data }) =>
  api
    .post(`/payments?billingId=${billingId}`, data)
    .then(handleResponse)
    .catch(handleError);

export const updateBillPayment = async ({ paymentId, billingId, data }) =>
  api
    .put(`/payments/${paymentId}?${billingId}`, data)
    .then(handleResponse)
    .catch(handleError);

export const deleteBillPayment = async (paymentId) =>
  api.delete(`/payments/${paymentId}`).then(handleResponse).catch(handleError);

export const generateInvoice = async (billingId) => {
  if (!billingId) return;
  const response = await api.post(
    `/billings/generate-pdf`,
    {
      billingId,
    },
    {
      responseType: "blob", // Set response type to blob
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
