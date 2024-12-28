import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchCategoriesApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleCategory = createAsyncThunk(
  "categories/fetchSingleCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSingleCategoryApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "categories/addNewCategory",
  async (data, { rejectWithValue }) => {
    try {
      return await inventoryApi.addCategoryApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editCategoryApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deleteCategoryApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categoryList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryList = action.payload;
        state.status = "success";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSingleCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleCategory.fulfilled, (state, action) => {
        state.categoryList = [action.payload];
        state.status = "success";
      })
      .addCase(fetchSingleCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload);
        state.status = "success";
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categoryList.findIndex(
          (category) => category.id === action.payload.id
        );
        state.categoryList[index] = action.payload;
        state.status = "success";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoryList = state.categoryList.filter(
          (category) => category.id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
