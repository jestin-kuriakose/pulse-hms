import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as employeeApi from "./services/employeeApi";

// Get All Employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeApi.fetchEmployeesApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a New Employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employeeApi.addEmployee(employeeData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an Employee info
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await employeeApi.updateEmployee(
        employeeData.id,
        employeeData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get an Employee info
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await employeeApi.fetchEmployeeById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete an Employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await employeeApi.deleteEmployee(id);
      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeSchedule = createAsyncThunk(
  "employees/fetchEmployeeSchedule",
  async ({ id, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.fetchEmployeeSchedule(
        id,
        startDate,
        endDate
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveEmployeeSchedule = createAsyncThunk(
  "employees/saveEmployeeSchedule",
  async ({ employeeId, schedule }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.saveEmployeeSchedule(
        employeeId,
        schedule
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployeeSchedule = createAsyncThunk(
  "employees/updateEmployeeSchedule",
  async ({ employeeId, scheduleId, schedule }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.updateEmployeeSchedule(
        employeeId,
        scheduleId,
        schedule
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEmployeeSchedule = createAsyncThunk(
  "employees/deleteEmployeeSchedule",
  async ({ employeeId, scheduleId }, { rejectWithValue }) => {
    try {
      const response = await employeeApi.deleteEmployeeSchedule(
        employeeId,
        scheduleId
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeAuditLogs = createAsyncThunk(
  'employees/fetchEmployeeAuditLogs',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await employeeApi.fetchEmployeeAuditLogs(employeeId);
      return response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    doctorList: [],
    currentEmployee: null,
    schedule: [],
    status: "idle",
    error: null,
    auditLogs: [],
  },
  reducers: {
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        state.list = action.payload;
        state.doctorList = action.payload.filter(
          (employee) => employee.position === "DOCTOR"
        )
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        state.list.push(action.payload);
        toast.success("Employee added successfully!");
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        const index = state.list.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.currentEmployee = action.payload;
        toast.success("Employee updated successfully!");
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        state.currentEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        state.list = state.list.filter(employee => employee.id !== action.payload.id);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchEmployeeSchedule.pending, (state) => {
        state.status = "schedule-loading";
        state.error = null
      })
      .addCase(fetchEmployeeSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null
        state.schedule = action.payload;
      })
      .addCase(fetchEmployeeSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(saveEmployeeSchedule.pending, (state, action) => {
        state.status = "schedule-updating";
        state.error = null
      })
      .addCase(saveEmployeeSchedule.fulfilled, (state, action) => {
        state.schedule.push(action.payload);
        state.status = "succeeded";
        state.error = null
        toast.success("Employee schedule updated successfully!");
      })
      .addCase(saveEmployeeSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateEmployeeSchedule.pending, (state, action) => {
        state.status = "schedule-updating";
        state.error = null
      })
      .addCase(updateEmployeeSchedule.fulfilled, (state, action) => {
        const { scheduleId, schedule } = action.meta.arg;
        console.log(scheduleId, schedule)
        const scheduleIndex = state.schedule.findIndex((s) => s.id === scheduleId);
        if (scheduleIndex !== -1) {
          state.schedule[scheduleIndex] = { ...state.schedule[scheduleIndex], ...schedule };
        }
        state.status = "succeeded";
        state.error = null
      })
      .addCase(updateEmployeeSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteEmployeeSchedule.pending, (state, action) => {
        state.status = "schedule-deleting";
        state.error = null
      })
      .addCase(deleteEmployeeSchedule.fulfilled, (state, action) => {
        state.schedule = state.schedule.filter(
          (event) => event.id !== action.payload.id
        );
        state.status = "succeeded";
        state.error = null
      })
      .addCase(deleteEmployeeSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchEmployeeAuditLogs.fulfilled, (state, action) => {
        state.auditLogs = action.payload;
      });
  },
});

export const { setCurrentEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
