import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSummaryTableDetails,
  fetchExceptionSummary,
  fetchExceptionSummaryByEquipment,
  fetchSummaryFilters,
  fetchSummaryFilterPreferences,
  fetchFilterPreferenceAseets,
  fetchFilteredSummaryDetails,
} from "./summaryV1TableThunk";
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
    showDateModal: {},
    filteredSummaryDetails: [],
  },
  reducers: {
    setShowDateModal: (state, action) => {
      state.showDateModal[action.payload.type] = action.payload.status;
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
  },
});

export const { setShowDateModal } = SummaryTableSlice.actions;

export default SummaryTableSlice.reducer;
