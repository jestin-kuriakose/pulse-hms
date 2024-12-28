import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSuppliersApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleSupplier = createAsyncThunk(
  "suppliers/fetchSingleSupplier",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSingleSupplierApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewSupplier = createAsyncThunk(
  "suppliers/addNewSupplier",
  async (data, { rejectWithValue }) => {
    try {
      return await inventoryApi.addSupplierApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editSupplierApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deleteSupplierApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState: {
    supplierList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.supplierList = action.payload;
        state.status = "success";
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSingleSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleSupplier.fulfilled, (state, action) => {
        state.supplierList = [action.payload];
        state.status = "success";
      })
      .addCase(fetchSingleSupplier.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addNewSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewSupplier.fulfilled, (state, action) => {
        state.supplierList.push(action.payload);
        state.status = "success";
      })
      .addCase(addNewSupplier.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        const index = state.supplierList.findIndex(
          (supplier) => supplier.id === action.payload.id
        );
        state.supplierList[index] = action.payload;
        state.status = "success";
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.supplierList = state.supplierList.filter(
          (supplier) => supplier.id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default supplierSlice.reducer;
