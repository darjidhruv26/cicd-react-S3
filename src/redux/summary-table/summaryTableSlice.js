import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSummaryTableDetails,
  fetchExceptionSummary,
  fetchExceptionSummaryByEquipment,
  fetchSummaryFilters,
  fetchSummaryFilterPreferences,
  fetchFilterPreferenceAseets,
  fetchFilteredSummaryDetails,
  fetchHistoryExceptionSummary,
  fetchPiExceptionSummary,
  fetchPiExceptionHistorySummary,
  fetchClosedPiExceptionHistorySummary,
} from "./summaryTableThunk";
import _ from "lodash";

export const SummaryTableSlice = createSlice({
  name: "SummaryTableSlice",
  initialState: {
    summaryTableDetails: [],
    summaryFilterPreferences: [],
    filterPreferenceAssets: [],
    // site_names: [],
    // models: [],
    // fleet_types: [],
    // asset_names: [],
    summaryFilters: {},
    exceptionSummary: {},
    historyExceptionSummary: [],
    piExceptionSummary: {
      isLoading: false,
      hasMore: true,
      data: [],
      lastPage: null,
    },
    piExceptionHistorySummary: {
      isLoading: false,
      hasMore: true,
      data: [],
      lastPage: null,
    },
    closedPiExceptionHistorySummary: {
      isLoading: false,
      hasMore: true,
      data: [],
      lastPage: null,
    },
    showDateModal: {'exceptionId': '', 'category': ''},
    filteredSummaryDetails: [],
  },
  reducers: {
    setShowDateModal: (state, action) => {
      state.showDateModal[action.payload.type] = action.payload.status;
      state.showDateModal['exceptionId'] = action.payload?.exceptionId
      state.showDateModal['category'] = action.payload?.category
    },
  },
  extraReducers: {
    [fetchSummaryTableDetails.fulfilled]: (state, { payload }) => {
      return { ...state, summaryTableDetails: payload };
    },
    [fetchExceptionSummary.fulfilled]: (state, { payload }) => {
      return { ...state, exceptionSummary: _.cloneDeep(payload) };
    },
    [fetchExceptionSummaryByEquipment.fulfilled]: (state, { payload }) => {
      return { ...state, exceptionSummary: payload };
    },
    [fetchSummaryFilters.fulfilled]: (state, { payload }) => {
      return { ...state, summaryFilters: payload };
    },
    [fetchSummaryFilterPreferences.fulfilled]: (state, { payload }) => {
      return { ...state, summaryFilterPreferences: payload };
    },
    [fetchFilterPreferenceAseets.fulfilled]: (state, { payload }) => {
      return { ...state, filterPreferenceAssets: payload };
    },
    [fetchFilteredSummaryDetails.fulfilled]: (state, { payload }) => {
      return { ...state, filteredSummaryDetails: payload };
    },
    [fetchHistoryExceptionSummary.fulfilled]: (state, { payload }) => {
      return { ...state, historyExceptionSummary: payload };
    },
    [fetchPiExceptionSummary.fulfilled]: (state, { payload: {payload, page, old_data} }) => {
      return { ...state, piExceptionSummary: {
          isLoading: false,
          hasMore: (payload && payload?.data?.length > 0) ? true : false,
          data: (old_data?.length && payload?.page !== 0) ? [...old_data, ...payload?.data] : payload?.data,
          lastPage: payload?.page
        } 
      };
    },
    [fetchPiExceptionHistorySummary.fulfilled]: (state, { payload: {payload, page, old_data} }) => {
      return { ...state, piExceptionHistorySummary: {
          isLoading: false,
          hasMore: (payload && payload?.data?.length > 0) ? true : false,
          data: (old_data?.length && payload?.page !== 0)  ? [...old_data, ...payload?.data] : payload?.data,
          lastPage: payload?.page
        } 
      };
    },
    [fetchClosedPiExceptionHistorySummary.fulfilled]: (state, { payload: {payload, page, old_data} }) => {
      return { ...state, closedPiExceptionHistorySummary: {
          isLoading: false,
          hasMore: (payload && payload?.data?.length > 0) ? true : false,
          data: (old_data?.length && payload?.page !== 0)  ? [...old_data, ...payload?.data] : payload?.data,
          lastPage: payload?.page
        } 
      };
    },
  },
});

export const { setShowDateModal } = SummaryTableSlice.actions;

export default SummaryTableSlice.reducer;
