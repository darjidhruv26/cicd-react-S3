import { createSlice } from "@reduxjs/toolkit";
import { fetchSeverityData } from "./subHeaderThunks";

export const SubHeaderSlice = createSlice({
  name: "subHeaderSlice",
  initialState: {
    severityData: {},
  },
  reducers: {},
  extraReducers: {
    [fetchSeverityData.fulfilled]: (state, { payload }) => {
      return { ...state, severityData: payload };
    },
  },
});

// export const {  } = SubHeaderSlice.actions;

export default SubHeaderSlice.reducer;
