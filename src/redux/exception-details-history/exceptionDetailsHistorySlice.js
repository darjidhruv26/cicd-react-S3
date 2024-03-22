import { createSlice } from "@reduxjs/toolkit";
import { fetchExceptionDetailsHistory } from "./exceptionDetailsHistoryThunks";

const initialState = {
  exceptionDetailsHistory: { isloading: false, data: [], error: "" },
};

export const ExceptionHistorySlice = createSlice({
  name: "ExceptionHistorySlice",
  initialState,
  reducers: {
    setSelectedException: (state, action) => {
      state.selectedException = action.payload;
    },
    setIframeFullScreen: (state, action) => {
      state.iframefullScreen = action.payload;
    },
    resetExceptionDetails: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [fetchExceptionDetailsHistory.pending]: (state) => {
      return {
        ...state,
        exceptionDetailsHistory: { isloading: true, data: [], error: "" },
      };
    },
    [fetchExceptionDetailsHistory.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        exceptionDetailsHistory: { isloading: false, data: payload, error: "" },
      };
    },
    [fetchExceptionDetailsHistory.rejected]: (state, { payload, error }) => {
      return {
        ...state,
        exceptionDetailsHistory: { isloading: false, data: [], error: error },
      };
    },
  },
});

export const {
  setSelectedException,
  setIframeFullScreen,
  resetExceptionDetails,
} = ExceptionHistorySlice.actions;

export default ExceptionHistorySlice.reducer;
