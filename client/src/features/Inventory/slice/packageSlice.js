import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (search = "", { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchPackagesApi(search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSinglePackage = createAsyncThunk(
  "packages/fetchSinglePackage",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSinglePackageApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewPackage = createAsyncThunk(
  "packages/addNewPackage",
  async (data, { rejectWithValue }) => {
    try {
      return await inventoryApi.addPackageApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePackage = createAsyncThunk(
  "packages/updatePackage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editPackageApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePackage = createAsyncThunk(
  "packages/deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deletePackageApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    packageList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.packageList = action.payload;
        state.status = "success";
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSinglePackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePackage.fulfilled, (state, action) => {
        state.packageList = action.payload;
        state.status = "success";
      })
      .addCase(fetchSinglePackage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addNewPackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewPackage.fulfilled, (state, action) => {
        state.packageList.push(action.payload);
        state.status = "success";
      })
      .addCase(addNewPackage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updatePackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.packageList.findIndex(
          (pkg) => pkg.id === action.payload.id
        );
        state.packageList[index] = action.payload;
        state.status = "success";
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deletePackage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packageList = state.packageList.filter(
          (pkg) => pkg.id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default packageSlice.reducer;
