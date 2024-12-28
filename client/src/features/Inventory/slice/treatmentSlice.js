import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchTreatments = createAsyncThunk(
  "treatments/fetchTreatments",
  async (search = "", { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchTreatmentsApi(search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleTreatment = createAsyncThunk(
  "treatments/fetchSingleTreatment",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSingleTreatmentApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTreatment = createAsyncThunk(
  "treatments/addNewTreatment",
  async (data, { rejectWithValue }) => {
    try {
      return await inventoryApi.addTreatmentApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTreatment = createAsyncThunk(
  "treatments/updateTreatment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editTreatmentApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTreatment = createAsyncThunk(
  "treatments/deleteTreatment",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deleteTreatmentApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const treatmentSlice = createSlice({
  name: "treatments",
  initialState: {
    treatmentList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.treatmentList = action.payload;
        state.status = "success";
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSingleTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleTreatment.fulfilled, (state, action) => {
        state.treatmentList = action.payload;
        state.status = "success";
      })
      .addCase(fetchSingleTreatment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addNewTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTreatment.fulfilled, (state, action) => {
        state.treatmentList.push(action.payload);
        state.status = "success";
      })
      .addCase(addNewTreatment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTreatment.fulfilled, (state, action) => {
        const index = state.treatmentList.findIndex(
          (treatment) => treatment.id === action.payload.id
        );
        state.treatmentList[index] = action.payload;
        state.status = "success";
      })
      .addCase(updateTreatment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteTreatment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        state.treatmentList = state.treatmentList.filter(
          (treatment) => treatment.id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deleteTreatment.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default treatmentSlice.reducer;
