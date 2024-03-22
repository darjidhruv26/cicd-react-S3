import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchSummaryTableDetails = createAsyncThunk(
    "summary/fetchsummaryTableDetails",
    async (payload) => {
        const response = await api.get('/summary', {
            params: {
                filter_group_id: payload.filterGroupId
            }
        });
        return response.data;
    }
);

export const fetchExceptionSummary = createAsyncThunk(
    "summary/fetchExceptionSummary",
    async (payload) => {
        const response = await api.get('/exception-summary', {
            params: {
                selected_severity: payload.selected_severity
            }
        });
        return response.data;
    }
);

export const fetchHistoryExceptionSummary = createAsyncThunk(
    "summary/fetchHistoryExceptionSummary",
    async (payload) => {
        const response = await api.get('/exception-summary-last-30d',{
            params: {
                selected_severity: payload.selected_severity
            } 
        });
        return response.data;
    }
)

export const fetchExceptionSummaryByEquipment = createAsyncThunk(
    "summary/fetchExceptionSummaryByEquipment",
    async (payload) => {
        const response = await api.get('/exception-summary', {
            params: { equipment_id: payload.equipment_id },
          });
        return response.data;
    }
);

export const fetchSummaryFilters = createAsyncThunk(
    "summary/fetchSummaryFilters",
    async () => {
        const response = await api.get('/summary-filters', {});
        return response.data.summary_filter_data;
    }
);

export const fetchSummaryFilterPreferences = createAsyncThunk(
    "summary/fetchSummaryFilterPreferences",
    async (payload) => {
        const response = await api.get('/filter-preferences-all', {
            params: { user_id: payload.user_id },
        });
        return response.data;
    }
);

export const fetchFilterPreferenceAseets = createAsyncThunk(
    "summary/fetchFilterPreferenceAseets",
    async (payload) => {
        const response = await api.get('/filter-preferences-assets-all', {
            params: { user_id: payload.user_id },
        });
        return response.data;
    }
);

export const fetchFilteredSummaryDetails = createAsyncThunk(
    "summary/fetchFilteredSummaryDetails",
    async (payload) => {
        const response = await api.get('/summary/filter', {
            params: {
                ids_str: payload?.ids_str
            }
        });
        return response.data;
    }
);

export const fetchPiExceptionSummary = createAsyncThunk(
    "summary/fetchPiExceptionSummary",
    async (payload, { getState }) => {
        const response = await api.get('/pi-exception-summary', {
            params: {
                selected_severity: payload?.selected_severity,
                page: payload?.page,
                per_page: payload.perPage || 10,
                selected_filter_group: payload?.selected_filter_group,
                search_params: payload?.search_params,
            } 
        });
        return {payload: response.data, page: payload?.page, old_data: getState().summaryTableReducer?.piExceptionSummary?.data}
    }
)

export const fetchPiExceptionHistorySummary = createAsyncThunk(
    "summary/fetchPiExceptionHistorySummary",
    async (payload, { getState }) => {
        const response = await api.get('/pi-exception-summary-last-30d',{
            params: {
                selected_severity: payload?.selected_severity,
                page: payload?.page,
                per_page: payload.perPage || 10,
                selected_filter_group: payload?.selected_filter_group,
                search_params: payload?.search_params,
            } 
        });
        return {payload: response.data, page: payload?.page, old_data: getState().summaryTableReducer?.piExceptionHistorySummary?.data}
    }
)

export const fetchClosedPiExceptionHistorySummary = createAsyncThunk(
    "summary/fetchClosedPiExceptionHistorySummary",
    async (payload, { getState }) => {
        const response = await api.get('/closed-pi-exception-summary',{
            params: {
                selected_severity: payload?.selected_severity,
                page: payload?.page,
                per_page: payload.perPage || 10,
                selected_filter_group: payload?.selected_filter_group,
                search_params: payload?.search_params,
            } 
        });
        return {payload: response.data, page: payload?.page, old_data: getState().summaryTableReducer?.closedPiExceptionHistorySummary?.data}
    }
)