import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchMedicines = createAsyncThunk(
  "medicines/fetchMedicines",
  async (search = "", { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchMedicinesApi(search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleMedicine = createAsyncThunk(
  "medicines/fetchSingleMedicine",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSingleMedicineApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewMedicine = createAsyncThunk(
  "medicines/addNewMedicine",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      return await inventoryApi.addMedicineApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "medicines/updateMedicine",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editMedicineApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMedicine = createAsyncThunk(
  "medicines/deleteMedicine",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deleteMedicineApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const medicineSlice = createSlice({
  name: "medicines",
  initialState: {
    medicineList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMedicines.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMedicines.fulfilled, (state, action) => {
      state.medicineList = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchMedicines.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });

    builder.addCase(fetchSingleMedicine.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSingleMedicine.fulfilled, (state, action) => {
      state.medicineList = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchSingleMedicine.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(addNewMedicine.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewMedicine.fulfilled, (state, action) => {
      state.medicineList.push(action.payload);
      state.status = "success";
    });
    builder.addCase(addNewMedicine.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(updateMedicine.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateMedicine.fulfilled, (state, action) => {
      const index = state.medicineList.findIndex(
        (med) => med.id === action.payload.id
      );
      state.medicineList[index] = action.payload;
      state.status = "success";
    });
    builder.addCase(updateMedicine.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
    builder.addCase(deleteMedicine.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteMedicine.fulfilled, (state, action) => {
      state.medicineList = state.medicineList.filter(
        (med) => med.id !== action.payload.id
      );
      state.status = "success";
    });
    builder.addCase(deleteMedicine.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default medicineSlice.reducer;
