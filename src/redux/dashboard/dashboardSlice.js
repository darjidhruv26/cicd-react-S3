import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardAssets,
  fetchDashboardAssetBySitename,
  fetchDashboardAssetByFleettype,
  fetchDashboardAssetByModel,
} from "./dashboardThunks";
import _ from "lodash";

export const DashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    dashboardAssets: [],
    showEquipmentSelect: false,
  },
  reducers: {
    setShowEquipmentSelect: (state, action) => {
      state.showEquipmentSelect = action.payload;
    },
  },
  extraReducers: {
    [fetchDashboardAssets.fulfilled]: (state, { payload }) => {
      return { ...state, dashboardAssets: payload };
    },
    [fetchDashboardAssetBySitename.fulfilled]: (state, { payload }) => {
      const { response, itemIndex } = payload;
      const dashboardAsset = _.cloneDeep(state.dashboardAssets);
      dashboardAsset[itemIndex] = {
        ...dashboardAsset[itemIndex],
        data: response,
      };
      return { ...state, dashboardAssets: dashboardAsset };
    },
    [fetchDashboardAssetByFleettype.fulfilled]: (state, { payload }) => {
      const { response, itemIndex, siteIndex } = payload;
      const dashboardAsset = _.cloneDeep(state.dashboardAssets);
      dashboardAsset[itemIndex].data[siteIndex] = {
        ...dashboardAsset[itemIndex].data[siteIndex],
        data: response,
      };
      return { ...state, dashboardAssets: dashboardAsset };
    },
    [fetchDashboardAssetByModel.fulfilled]: (state, { payload }) => {
      const { response, itemIndex, siteIndex, fleetIndex } = payload;
      const dashboardAsset = _.cloneDeep(state.dashboardAssets);
      dashboardAsset[itemIndex].data[siteIndex].data[fleetIndex] = {
        ...dashboardAsset[itemIndex].data[siteIndex].data[fleetIndex],
        data: response,
      };
      return { ...state, dashboardAssets: dashboardAsset };
    },
  },
});

export const { setShowEquipmentSelect } = DashboardSlice.actions;

export default DashboardSlice.reducer;
