import { createSlice } from "@reduxjs/toolkit";
import {
  fetchClosedEventExceptionHistory,
} from "./historyTableThunk";
import _ from "lodash";

export const HistoryTableSlice = createSlice({
  name: "HistoryTableSlice",
  initialState: {
    closedEventExceptionHistory: {
      isLoading: false,
      hasMore: true,
      data: [],
      lastPage: null,
    },
  },
  reducers: {},
  extraReducers: {
    [fetchClosedEventExceptionHistory.fulfilled]: (state, { payload: {payload, page, old_data} }) => {
      return { ...state, closedEventExceptionHistory: {
          isLoading: false,
          hasMore: (payload && payload?.data?.length > 0) ? true : false,
          data: (old_data?.length && payload?.page !== 0)  ? [...old_data, ...payload?.data] : payload?.data,
          lastPage: payload?.page
        } 
      };
    },
  },
});


export default HistoryTableSlice.reducer;
