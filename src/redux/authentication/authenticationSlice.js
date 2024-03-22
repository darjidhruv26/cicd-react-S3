import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authenticationThunk";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {},
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    }
  }
});

// export const { } = authenticationSlice.actions;

export default authenticationSlice.reducer;