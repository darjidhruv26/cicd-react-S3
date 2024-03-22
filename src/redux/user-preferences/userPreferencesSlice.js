import { createSlice } from "@reduxjs/toolkit";
import { fetchUserPreferences } from "./userPreferencesThunk";
import { updateUserPreferences } from "./userPreferencesThunk";

export const UserPreferencesSlice = createSlice({
    name: "UserPreferencesSlice",
    initialState: {
        userPreferences: {
            selected_filter_group_id: null,
            selected_page: null,
            theme: null,
            user_id: null,
            selected_severity: [],
        },
    },
    extraReducers: {
        [fetchUserPreferences.fulfilled]: (state, action) => {
            state.userPreferences = action.payload;
        },
        [updateUserPreferences.fulfilled]: (state, action) => {
            state.userPreferences = action.payload;
        }
    }
});

export default UserPreferencesSlice.reducer;