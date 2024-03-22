import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEquipmentDetails,
  fetchExceptionComments,
  fetchExceptionDetails,
  fetchExceptionStatus,
  fetchExceptionWorkOrders,
  fetchExceptionConMonRecords,
  fetchOilAnalysisRecords,
  fetchFaultRecords,
  fetchExceptionDocuments,
  fetchExceptionPMStatusNextDate,
  fetchExceptionStatusValues,
  fetchExceptionReasonValues,
  fetchRemsConmonWatchlistValues,
  fetchREMSOptions,
  fetchFunctionalLocations,
  fetchExceptionHistory,
  fetchREMSDetails,
  fetchExceptionManagementHistory,
} from "./exceptionDetailsThunks";

const initialState = {
  selectedException: [],
  isLoading: false,
  isLoadingfault:false,
  selectedEquipment: [],
  error: "",
  allComments: [],
  selectedExceptionStatus: {},
  selectedTecoExceptionWorkOrders: {
    data: [],
    lastPage: false,
    isLastPage: false,
  },
  selectedPlannedExceptionWorkOrders: {
    data: [],
    lastPage: false,
    isLastPage: false,
  },
  planned_workorder_type: "",
  teco_workorder_type: "",
  selectedExceptionWorkOrders: [],
  selectedConMonDataRecords: [],
  selectedOilAnalysisRecords: {},
  selectedFaultRecords: [],
  selectedExceptionDocuments: [],
  selectedExceptionPMStatus: {},
  lastNextDate: [],
  exceptionStatusValues: [],
  exceptionReasonValues: [],
  remsConmonWatchlistRecord: [],
  remsOptions: {},
  functionalLocations: [],
  history: [],
  managementHistory: [],
  iframefullScreen: false,
  REMSDetails: [],
};

export const ExceptionDetailsSlice = createSlice({
  name: "exceptionDetailsSlice",
  initialState,
  reducers: {
    setSelectedException: (state, action) => {
      state.selectedException = action.payload;
    },
    setIframeFullScreen: (state, action) => {
      state.iframefullScreen = action.payload;
    },
    resetExceptionDetails: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    [fetchExceptionDetails.pending]: (state, { payload }) => {
      return { ...state};
    },
    [fetchExceptionDetails.fulfilled]: (state, { payload }) => {
      return { ...state, selectedException: payload, isLoading: false };
    },
    [fetchExceptionDetails.rejected]: (state, { payload, error }) => {
      return {
        ...state,
        isLoading: false,
        selectedException: [],
        error: error,
      };
    },

    [fetchEquipmentDetails.pending]: (state) => {
      return { ...state, selectedEquipment: [], isLoading: true };
    },
    [fetchEquipmentDetails.fulfilled]: (state, { payload }) => {
      return { ...state, selectedEquipment: payload, isLoading: false };
    },
    [fetchEquipmentDetails.rejected]: (state, { payload, error }) => {
      return {
        ...state,
        isLoading: false,
        selectedEquipment: [],
        error: error,
      };
    },

    [fetchExceptionComments.fulfilled]: (state, { payload }) => {
      return { ...state, allComments: payload };
    },

    [fetchExceptionStatus.pending]: (state, { payload }) => {
      return { ...state };
    },
    [fetchExceptionStatus.fulfilled]: (state, { payload }) => {
      return { ...state, selectedExceptionStatus: payload };
    },
    [fetchExceptionStatus.rejected]: (state, { payload, error }) => {
      return { ...state, error: error };
    },

    [fetchExceptionWorkOrders.fulfilled]: (state, { payload }) => {
      if (
        payload.status === "planned" &&
        state.selectedPlannedExceptionWorkOrders.page !== payload.page
      ) {
        return {
          ...state,
          selectedPlannedExceptionWorkOrders: {
            data:
              state.planned_workorder_type === payload.workorder_type &&
              payload.page !== 0
                ? [
                    ...state.selectedPlannedExceptionWorkOrders.data,
                    ...payload.data,
                  ]
                : [...payload.data],
            lastPage: payload.page,
            isLastPage: payload?.data?.length ? false : true,
          },
          planned_workorder_type: payload.workorder_type,
        };
      } else if (
        payload.status === "teco" &&
        state.selectedTecoExceptionWorkOrders.page !== payload.page
      ) {
        return {
          ...state,
          selectedTecoExceptionWorkOrders: {
            data:
              state.teco_workorder_type === payload.workorder_type &&
              payload.page !== 0
                ? [
                    ...state.selectedTecoExceptionWorkOrders.data,
                    ...payload.data,
                  ]
                : [...payload.data],
            lastPage: payload.page,
            isLastPage: payload?.data?.length ? false : true,
          },
          teco_workorder_type: payload.workorder_type,
        };
      } else {
        return {
          ...state,
          selectedExceptionWorkOrders: [
            ...state.selectedExceptionWorkOrders.data,
            ...payload.data,
          ],
        };
      }
    },

    [fetchExceptionConMonRecords.pending]: (state, { payload }) => {
      return { ...state };
    },
    [fetchExceptionConMonRecords.fulfilled]: (state, { payload }) => {
      return { ...state, selectedConMonDataRecords: payload };
    },
    [fetchExceptionConMonRecords.rejected]: (state, { payload, error }) => {
      return { ...state, error: error };
    },

    [fetchOilAnalysisRecords.fulfilled]: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        payload[key] = payload[key].map((item) => ({
          ...item,
          DATA: JSON.parse(item.DATA),
        }));
      });
      return { ...state, selectedOilAnalysisRecords: payload };
    },
    [fetchFaultRecords.pending]: (state) => {
      return { ...state, isLoadingfault: true };
    },
    [fetchFaultRecords.fulfilled]: (state, { payload }) => {
      return { ...state, selectedFaultRecords: payload, isLoadingfault: false };
    },
    [fetchFaultRecords.rejected]: (state, { payload, error }) => {
      return { ...state, error: error,isLoadingfault: false };
    },
    [fetchExceptionDocuments.fulfilled]: (state, { payload }) => {
      return { ...state, selectedExceptionDocuments: payload };
    },
    [fetchExceptionPMStatusNextDate.fulfilled]: (state, { payload }) => {
      return { ...state, lastNextDate: payload };
    },

    [fetchExceptionStatusValues.pending]: (state, { payload }) => {
      return { ...state };
    },
    [fetchExceptionStatusValues.fulfilled]: (state, { payload }) => {
      return { ...state, exceptionStatusValues: payload };
    },
    [fetchExceptionStatusValues.rejected]: (state, { payload, error }) => {
      return { ...state, exceptionStatusValues: payload, error: error };
    },

    [fetchExceptionReasonValues.fulfilled]: (state, { payload }) => {
      return { ...state, exceptionReasonValues: payload };
    },
    [fetchRemsConmonWatchlistValues.fulfilled]: (state, { payload }) => {
      // let filtered_payload = payload.filter((rem_record) => rem_record.statusName !== 'Closed') // removing closed filter from REMS options in dropdown to attach rems item.
      return { ...state, remsConmonWatchlistRecord: payload };
    },
    [fetchREMSOptions.fulfilled]: (state, { payload }) => {
      return { ...state, remsOptions: payload };
    },
    [fetchFunctionalLocations.fulfilled]: (state, { payload }) => {
      return { ...state, functionalLocations: payload };
    },
    [fetchExceptionHistory.fulfilled]: (state, { payload }) => {
      return { ...state, history: payload };
    },
    [fetchExceptionManagementHistory.fulfilled]: (state, { payload }) => {
      return { ...state, managementHistory: payload };
    },
    [fetchREMSDetails.fulfilled]: (state, { payload }) => {
      return { ...state, REMSDetails: payload };
    },
  },
});

export const {
  setSelectedException,
  setIframeFullScreen,
  resetExceptionDetails,
} = ExceptionDetailsSlice.actions;

export default ExceptionDetailsSlice.reducer;
