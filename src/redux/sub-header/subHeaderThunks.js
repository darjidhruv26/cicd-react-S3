import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchSeverityData = createAsyncThunk(
    "subHeader/fetchSeverityData",
    async (payload) => {
        const response = await api.get('severity_data', {
            params: payload,
          });
        return response.data;
    }
);