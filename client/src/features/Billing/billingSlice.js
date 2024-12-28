import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as billingApi from "./services/billingApi";

export const fetchBillings = createAsyncThunk(
  "billing/fetchBillings",
  async ({ search, dateRange }, { rejectWithValue }) => {
    try {
      return await billingApi.fetchBillings({ search, dateRange });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleBilling = createAsyncThunk(
  "billing/fetchSingleBilling",
  async (id, { rejectWithValue }) => {
    try {
      return await billingApi.fetchSingleBilling(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBillingStatus = createAsyncThunk(
  "billing/updateBillingStatus",
  async (id, { rejectWithValue }) => {
    try {
      return await billingApi.updateBillingStatus(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBillingDiscountAmount = createAsyncThunk(
  "billing/updateBillingDiscount",
  async ({ id, discount }, { rejectWithValue }) => {
    try {
      return await billingApi.updateBillingDiscountAmount({ id, discount });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewBilling = createAsyncThunk(
  "billing/addNewBilling",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      return await billingApi.addNewBilling(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBillPayment = createAsyncThunk(
  "billing/addBillPayment",
  async (data, { rejectWithValue }) => {
    try {
      return await billingApi.addBillPayment(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBillPayment = createAsyncThunk(
  "billing/updateBillPayment",
  async (data, { rejectWithValue }) => {
    try {
      return await billingApi.updateBillPayment(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBillPayment = createAsyncThunk(
  "billing/deleteBillPayment",
  async (id, { rejectWithValue }) => {
    try {
      return await billingApi.deleteBillPayment(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generateInvoice = createAsyncThunk(
  "billing/generateInvoice",
  async (billingId, { rejectWithValue }) => {
    try {
      return await billingApi.generateInvoice(billingId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billingList: [],
    currentBilling: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBillings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.billingList = action.payload;
      })
      .addCase(fetchBillings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleBilling.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleBilling.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentBilling = action.payload;
      })
      .addCase(fetchSingleBilling.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateBillingStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentBilling) {
          state.currentBilling.status = action.payload.status;
        }
      })
      .addCase(updateBillingDiscountAmount.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentBilling) {
          state.currentBilling.discount = action.payload.discount;
          state.currentBilling.total = action.payload.total;
        }
      })
      .addCase(addNewBilling.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.billingList.push(action.payload);
      })
      .addCase(addBillPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentBilling) {
          state.currentBilling.payments.push(action.payload);
        }
      })
      .addCase(updateBillPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentBilling) {
          const index = state.currentBilling.payments.findIndex(
            (payment) => payment.id === action.payload.id
          );
          if (index !== -1) {
            state.currentBilling.payments[index] = action.payload;
          }
        }
      })
      .addCase(deleteBillPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentBilling) {
          state.currentBilling.payments = state.currentBilling.payments.filter(
            (payment) => payment.id !== action.payload.id
          );
        }
      })
      .addCase(generateInvoice.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export default billingSlice.reducer;
