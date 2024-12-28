import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as patientsApi from "./services/patientApi";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (search = "", { rejectWithValue }) => {
    try { 
      return await patientsApi.fetchPatientsApi(search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSinglePatient = createAsyncThunk(
  "patients/fetchSinglePatient",
  async (id, { rejectWithValue }) => {
    try {
      return await patientsApi.fetchSinglePatientApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patientList: [],
    currentPatient: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patientList = action.payload;
        state.status = "success";
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSinglePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePatient.fulfilled, (state, action) => {
        state.currentPatient = action.payload;
        state.status = "success";
      })
      .addCase(fetchSinglePatient.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
