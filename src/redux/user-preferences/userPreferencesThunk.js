import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchUserPreferences = createAsyncThunk(
    "user-preferences/fetchUserPreferences",
    async (payload) => {
        const response = await api.get('/user-preferences', {
            params: {
                user_id: payload.userId
            }
        });
        return response.data.length > 0 ? response.data[0] : response.data;
    }
);

export const updateUserPreferences = createAsyncThunk(
    "user-preferences/updateUserPreferences",
    async (payload) => {
        const response = await api.post('/user-preferences', payload);
        return response.data;
    }
);