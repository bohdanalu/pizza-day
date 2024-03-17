import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const userSlice = createSlice({
  name: "userName",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updateUserName } = userSlice.actions;

export default userSlice.reducer;
