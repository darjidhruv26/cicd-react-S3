import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchCustomFilterAssets = createAsyncThunk(
  "customFilter/filterAssets",
  async (payload) => {
    if(payload){
      const response = await api.get("filter-group", { params: { filter_group_id: payload.filter_group_id}});
      return response.data;
    }else{
      const response = await api.get("filter-group");
      return response.data;
    }
  }
);

export const fetchCustomFilterGroupList = createAsyncThunk(
  "CustomFilterGroup/filterGroupList",
  async (payload) => {
    const response = await api.get("list-filter-group", {
      params: {
        user_id: payload.userId
      }
    });
    return response.data;
  }
);