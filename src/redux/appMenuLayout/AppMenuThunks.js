import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchAppMenuLayoutDetails = createAsyncThunk(
    "appMenu/fetchAppMenuLayoutDetails",
    async (payload) => {

        const response = await api.get('menus', {

            params: { user_id: payload.user_id },
          });
        return response.data;
    }
);