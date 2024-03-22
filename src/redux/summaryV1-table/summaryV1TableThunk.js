import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchSummaryTableDetails = createAsyncThunk(
    "summary/fetchSummaryTableDetails",
    async (payload) => {
        const response = await api.get('/summary-V1', {
            params: {
                filter_group_id: payload.filterGroupId
            }
        });
        return response.data;
    }
);

export const fetchExceptionSummary = createAsyncThunk(
    "summary/fetchExceptionSummary",
    async () => {
        const response = await api.get('/exception-summary-V1');
        return response.data;
    }
);

export const fetchExceptionSummaryByEquipment = createAsyncThunk(
    "summary/fetchExceptionSummaryByEquipment",
    async (payload) => {
        const response = await api.get('/exception-summary-V1', {
            params: { equipment_id: payload.equipment_id },
          });
        return response.data;
    }
);

export const fetchSummaryFilters = createAsyncThunk(
    "summary/fetchSummaryFilters",
    async () => {
        const response = await api.get('/summary-V1-filters', {});
        return response.data.summary_filter_data;
    }
);

export const fetchSummaryFilterPreferences = createAsyncThunk(
    "summary/fetchSummaryFilterPreferences",
    async (payload) => {
        const response = await api.get('/filter-V1-preferences-all', {
            params: { user_id: payload.user_id },
        });
        return response.data;
    }
);

export const fetchFilterPreferenceAseets = createAsyncThunk(
    "summary/fetchFilterPreferenceAseets",
    async (payload) => {
        const response = await api.get('/filter-V1-preferences-assets-all', {
            params: { user_id: payload.user_id },
        });
        return response.data;
    }
);

export const fetchFilteredSummaryDetails = createAsyncThunk(
    "summary/fetchFilteredSummaryDetails",
    async (payload) => {
        const response = await api.get('/summary-V1/filter', {
            params: {
                ids_str: payload?.ids_str
            }
        });
        return response.data;
    }
);