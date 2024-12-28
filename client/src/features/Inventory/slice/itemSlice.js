import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as inventoryApi from "../services/inventoryApi";

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (search = "", { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchItemsApi(search);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleItem = createAsyncThunk(
  "items/fetchSingleItem",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.fetchSingleItemApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewItem = createAsyncThunk(
  "items/addNewItem",
  async (data, { rejectWithValue }) => {
    try {
      return await inventoryApi.addItemApi(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await inventoryApi.editItemApi(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      return await inventoryApi.deleteItemApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState: {
    itemList: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.itemList = action.payload;
        state.status = "success";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(fetchSingleItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleItem.fulfilled, (state, action) => {
        state.itemList = action.payload;
        state.status = "success";
      })
      .addCase(fetchSingleItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(addNewItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewItem.fulfilled, (state, action) => {
        state.itemList.push(action.payload);
        state.status = "success";
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.itemList.findIndex(
          (item) => item.id === action.payload.id
        );
        state.itemList[index] = action.payload;
        state.status = "success";
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.itemList = state.itemList.filter(
          (item) => item.id !== action.payload.id
        );
        state.status = "success";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default itemSlice.reducer;
