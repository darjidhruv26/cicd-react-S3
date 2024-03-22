import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const createUser = createAsyncThunk(
    "authentication/createUser",
    async (payload) => {
        const response = await api.post("create-user", payload);
        return response.data;
    }
);