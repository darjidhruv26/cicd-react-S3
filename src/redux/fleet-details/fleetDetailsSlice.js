import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFleetEquipmentDetails,
  fetchFleetUploadedDocuments,
  fetchFleetComments,
  fetchFleetDetails,
} from "./fleetDetailsThunks";

export const FleetDetailsSlice = createSlice({
  name: "FleetDetailsSlice",
  initialState: {
    equipmentDetails: {},
    commentList: [],
    uploadedDocumentList: [],
    fleetDetails: [],
  },
  reducers: {},
  extraReducers: {
    [fetchFleetEquipmentDetails.fulfilled]: (state, { payload }) => {
      return { ...state, equipmentDetails: payload };
    },
    [fetchFleetUploadedDocuments.fulfilled]: (state, { payload }) => {
      return { ...state, uploadedDocumentList: payload };
    },
    [fetchFleetComments.fulfilled]: (state, { payload }) => {
      return { ...state, commentList: payload };
    },
    [fetchFleetDetails.fulfilled]: (state, { payload }) => {
      return { ...state, fleetDetails: payload };
    },
  },
});

// export const {  } = FleetDetailsSlice.actions;

export default FleetDetailsSlice.reducer;
