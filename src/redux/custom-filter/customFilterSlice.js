import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomFilterAssets, fetchCustomFilterGroupList } from "./customFilterThunk";

export const CustomFilterSlice = createSlice({
  name: "customFilterSlice",
  initialState: {
    customFilterAssets: [],
    filterGroupList: [],
    selectedFilterItem: null,
    updateFilterTable: [],
  },
  reducers: {
    setSelectedFilterItem: (state, action) => {
      state.selectedFilterItem = action.payload;
    },
    setUpdateFilterTable: (state, action) => {
      state.updateFilterTable = action.payload;
    },
  },
  extraReducers: {
    [fetchCustomFilterAssets.fulfilled]: (state, { payload }) => {
      return { ...state, customFilterAssets: payload };
    },
    [fetchCustomFilterGroupList.fulfilled]: (state, { payload }) => {
      return { ...state, filterGroupList: payload };
    },
  },
});

export const { setSelectedFilterItem, setUpdateFilterTable } = CustomFilterSlice.actions;

export default CustomFilterSlice.reducer;
