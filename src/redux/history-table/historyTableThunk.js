import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchClosedEventExceptionHistory = createAsyncThunk(
    "history/fetchClosedEventExceptionHistory",
    async (payload, { getState }) => {
        const response = await api.get('/closed-exception-history', {
            params: {
                selected_severity: payload?.selected_severity,
                page: payload?.page,
                per_page: payload.perPage || 10,
                selected_filter_group: payload?.selected_filter_group,
                search_params: payload?.search_params,
            }
        });
        return {payload: response.data, page: payload?.page, old_data: getState().historyTableReducer?.closedEventExceptionHistory?.data}
    }
);

