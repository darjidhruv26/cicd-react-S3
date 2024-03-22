import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchDashboardAssets = createAsyncThunk(
  "dashboard/Assets",
  async (payload) => {
    const response = await api.get("dashboard-asset"
    ,{
      params: { 
        filter_group_id: payload.filterGroupId
      },
    }
    );
    return response.data;
  }
);

export const fetchDashboardAssetBySitename = createAsyncThunk(
  "dashboard/fetchDashboardAssetBySitename",
  async (payload) => {
    const response = await api.get("dashboard-asset", {
      params: { 
        sitename: payload.siteName,
        filter_group_id: payload.filterGroupId
      },
    });
    return { response: response.data, itemIndex: payload.index };
  }
);

export const fetchDashboardAssetByFleettype = createAsyncThunk(
  "dashboard/fetchDashboardAssetByFleettype",
  async (payload) => {
    const response = await api.get("dashboard-asset", {
      params: {
        sitename: payload.siteItem.sitename,
        fleettype: payload.siteItem.fleet_type,
        filter_group_id: payload.filterGroupId
      },
    });
    return {
      response: response.data,
      itemIndex: payload.index,
      siteIndex: payload.siteIndex,
    };
  }
);

export const fetchDashboardAssetByModel = createAsyncThunk(
  "dashboard/fetchDashboardAssetByModel",
  async (payload) => {
    const response = await api.get("dashboard-asset", {
      params: {
        sitename: payload.fleetItem.sitename,
        fleettype: payload.fleetItem.fleet_type,
        model: payload.fleetItem.model,
        filter_group_id: payload.filterGroupId
      },
    });
    return {
      response: response.data,
      itemIndex: payload.index,
      siteIndex: payload.siteIndex,
      fleetIndex: payload.fleetIndex,
    };
  }
);
