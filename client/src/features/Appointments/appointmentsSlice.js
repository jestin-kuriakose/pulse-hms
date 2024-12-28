import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteAppointment,
  fetchAllAppointments,
  fetchPatientAppointmentsApi,
  newAppointment,
  updateAppointment,
} from "./services/api";
import * as appointmentApi from "./services/api";

export const getAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async ({ dateRange, search }) => {
    const response = await appointmentApi.fetchAllAppointments({ dateRange, search });
    return response;
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData) => {
    const response = await appointmentApi.newAppointment(appointmentData);
    return response;
  }
);

export const editAppointment = createAsyncThunk(
  "appointments/editAppointment",
  async ({ id, appointmentData }) => {
    const response = await appointmentApi.updateAppointment(id, appointmentData);
    return response;
  }
);

export const removeAppointment = createAsyncThunk(
  "appointments/removeAppointment",
  async (id) => {
    await appointmentApi.deleteAppointment(id);
    return id; // Return the id of the deleted appointment
  }
);

export const getPatientAppointments = createAsyncThunk(
  "appointments/getPatientAppointments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentApi.fetchPatientAppointmentsApi(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    currentAppointment: null,
    status: null,
  },
  reducers: {
    setCurrentAppointment(state, action) {
      state.currentAppointment = action.payload;
    },
    clearCurrentAppointment(state) {
      state.currentAppointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.status = "success";
      })
      .addCase(getAppointments.rejected, (state) => {
        state.status = "error";
        toast.error(action.error.message || "Failed to fetch appointments.");
      })
      .addCase(createAppointment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.status = "success";
        toast.success("Appointment added successfully.");
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message || "Failed to create appointment.");
      })
      .addCase(editAppointment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(
          (app) => app.id === action.payload.id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
          toast.success("Appointment updated successfully.");
        }
        state.status = "success";
      })
      .addCase(editAppointment.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message || "Failed to edit appointment.");
      })
      .addCase(removeAppointment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (app) => app.id !== action.payload
        );
        state.status = "success";
        toast.success("Appointment deleted successfully.");
      })
      .addCase(removeAppointment.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message || "Failed to delete appointment.");
      })
      .addCase(getPatientAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPatientAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.status = "success";
      })
      .addCase(getPatientAppointments.rejected, (state, action) => {
        state.status = "error";
        toast.error(action.error.message || "Failed to fetch appointments.");
      });
  },
});

export const { setCurrentAppointment, clearCurrentAppointment } =
  appointmentsSlice.actions;

export default appointmentsSlice.reducer;
