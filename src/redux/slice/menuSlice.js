import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL_MENU } from "../../helpers/constants";

const initialState = {
  menuItems: [],
  isLoading: false,
  error: null,
};

export const fetchAllItemsMenu = createAsyncThunk(
  "menu/fetchAllItemsMenu",
  async () => {
    const response = await fetch(API_URL_MENU);
    const { data } = await response.json();
    return data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItemsMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllItemsMenu.fulfilled, (state, action) => {
        state.menuItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllItemsMenu.rejected, (state) => {
        state.error = "Fetch error";
        state.isLoading = false;
      });
  },
});

export default menuSlice.reducer;
