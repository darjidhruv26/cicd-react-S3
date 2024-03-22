import { createSlice } from "@reduxjs/toolkit";
import { fetchAppMenuLayoutDetails } from "./AppMenuThunks";

export const AppMenuLayoutSlice = createSlice({
  name: "appMenuDetailsSlice",
  initialState: {
    appMenuDetails: [],
  },
  reducers: {},
  extraReducers: {
    [fetchAppMenuLayoutDetails.fulfilled]: (state, { payload }) => {
      return { ...state, appMenuDetails: payload };
    },
  },
});

// export const {  } = AppMenuLayoutSlice.actions;

export default AppMenuLayoutSlice.reducer;
