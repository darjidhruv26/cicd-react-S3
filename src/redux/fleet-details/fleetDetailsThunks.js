import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";

export const fetchFleetEquipmentDetails = createAsyncThunk(
  "fleetDetails/fetchFleetEquipmentDetails",
  async (equipment_id) => {
    const response = await api.get("/fleet", {
      params: {
        equipment_id,
      },
    });
    return response.data;
  }
);

export const fetchFleetUploadedDocuments = createAsyncThunk(
  "fleetDetails/fetchFleetUploadedDocuments",
  async (fleetId) => {
    const response = await api.get("/document", {
      params: {
        id: fleetId,
        document_type: "fleet",
      },
    });
    return response.data;
  }
);

export const fetchFleetComments = createAsyncThunk(
  "fleetDetails/fetchFleetComments",
  async (fleetId) => {
    const response = await api.get("/comments", {
      params: {
        id: fleetId,
        module_type: "fleet",
      },
    });
    return response.data;
  }
);

export const fetchFleetDetails = createAsyncThunk(
  "fleetDetails/fetchFleetDetails",
  async (assetName) => {
    const response = await api.get(`/fleet-details/${assetName}`);
    console.log("-----------------------",response);
    return response.data;
  }
);
