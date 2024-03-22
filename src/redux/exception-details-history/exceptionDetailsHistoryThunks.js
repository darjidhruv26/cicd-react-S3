import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchExceptionDetailsHistory = createAsyncThunk(
  "exceptionDetailsHistory/fetchexceptiondetailshistory",
  async (payload, { getState }) => {
    const response = await api.get("/api/get-exception-details-history", {
      params: {
        per_page: payload.per_page,
        search_params: {
          date_range_start_date: {
            operator: "ILIKE",
            value: payload.search_params.date_range_start_date,
            is_date: true,
          },
          date_range_end_date: {
            operator: "ILIKE",
            value: payload.search_params.date_range_end_date,
            is_date: true,
          },
        },
      },
    });
    return response.data;
  }
);