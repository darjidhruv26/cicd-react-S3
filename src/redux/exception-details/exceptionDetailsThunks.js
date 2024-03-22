import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";
import RemsAPI from "../../API/RemsAPI"
import axios from "axios";

export const fetchExceptionDetails = createAsyncThunk(
  "exceptionDetails/fetchExceptionDetails",
  async (exceptionId, { dispatch, getState, signal, rejectWithValue }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });
    try{
      const response = await api.get(`/api/get-exception-details/${exceptionId}`, {cancelToken: source.token});
      return response.data;
    }
    catch(error) {
        return rejectWithValue(new Error(error.statusText));
    }
  }
);

export const fetchEquipmentDetails = createAsyncThunk(
  "exceptionDetails/fetchEquipmentDetails",
  async (exceptionId, { dispatch, getState, signal, rejectWithValue  }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });
    try{
      const response = await api.get(`/exception-assets/${exceptionId}`, {cancelToken: source.token});
      return response.data;
    }
    catch(error) {
        return rejectWithValue(new Error(error.statusText));
    }
  }
);

export const fetchExceptionComments = createAsyncThunk(
  "exceptionDetails/fetchExceptionComments",
  async (exceptionId, { dispatch, getState, signal }) => {
    
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });

    const response = await api.get("/comments", {
      params: {
        id: exceptionId,
        module_type: "exception",
      },
      cancelToken: source.token,
    });
    // if (!response.ok) {
    //     return rejectWithValue(new Error(response.statusText));
    // }
    return response.data;
  }
);

export const fetchExceptionStatus = createAsyncThunk(
    "exceptionDetails/fetchExceptionStatus",
    async (exceptionId, { dispatch, getState, signal, rejectWithValue }) => {
      try{
        const response = await api.get(`/exception-status`, {
            params: {
                exception_id: exceptionId
            }
        });
        return response.data;
        
      }
      catch(exception){
        return rejectWithValue(exception)
      }
    }
)

export const fetchExceptionWorkOrders = createAsyncThunk(
  "exceptionDetails/fetchExceptionWorkOrders",
  async (payload) => {
    const response = await api.get(`/work-order/${payload.equipmentID}`, {
      params: {
        startdate: payload.startdate,
        status: payload.status,
        page: payload.page,
        limit: payload.limit,
        mode: payload.mode,
        workorder_type: payload.workorder_type,
      },
    });
    // if (!response.ok) {
    //     return rejectWithValue(new Error(response.statusText));
    // }
    return { data: response.data, page: payload.page, status: payload.status, workorder_type: payload.workorder_type };
  }
);

export const fetchExceptionConMonRecords = createAsyncThunk(
  "exceptionDetails/fetchExceptionConMonRecords",
  async (payload, { dispatch, getState, signal, rejectWithValue }) => {
    try{

      const response = await api.get(`/conmon/${payload.equipmentID}`);
      return response.data;
    }
    catch (error){
      return rejectWithValue(new Error(error.statusText));
    }
  }
);

export const fetchOilAnalysisRecords = createAsyncThunk(
  "exceptionDetails/fetchOilAnalysisRecords",
  async (payload) => {
    const response = await api.get(`/oil-analysis`, {
      params: {
        serial_number: payload.serialNumber,
        startdate: payload.startdate 
      },
    });
    return response.data;
  }
);

export const fetchFaultRecords = createAsyncThunk(
  "exceptionDetails/fetchFaults",
  async (payload) => {
    const response = await api.get(`/fault/${payload.equipmentID}`, {
      params: { startdate: payload.startdate, enddate: payload.endDate },
    });
    // if (!response.ok) {
    //     return rejectWithValue(new Error(response.statusText));
    // }
    return response.data;
  }
);

export const fetchExceptionDocuments = createAsyncThunk(
  "exceptionDetails/fetchExceptionDocuments",
  async (exceptionId, { dispatch, getState, signal }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });

    const response = await api.get(`/document`, {
      params: {
        id: exceptionId,
        document_type: "exception",
      },
      cancelToken: source.token,
    });
    // if (!response.ok) {
    //     return rejectWithValue(new Error(response.statusText));
    // }
    return response.data;
  }
);

export const fetchExceptionPMStatusNextDate = createAsyncThunk(
  "exceptionDetails/fetchExceptionPMStatusNextDate",
  async (payload) => {
    const response = await api.get(`/get-last-next-pm`, {
      params: {
        startdate: payload.startdate,
        equipment_id: payload.equipmentID
      },
    });
    return response.data;
  }
);

export const fetchExceptionStatusValues = createAsyncThunk(
  "exceptionDetails/fetchExceptionStatusValues",
  async (_, { dispatch, getState, signal }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });
    const response = await api.get(`/exception-status-values`, {cancelToken: source.token});
    return response.data;
  }
);


export const fetchExceptionReasonValues = createAsyncThunk(
  "exceptionDetails/fetchExceptionReasonValues",
  async (_, { dispatch, getState, signal }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });
    const response = await api.get(`/exception-reason-values`, {cancelToken: source.token});
    return response.data;
  }
);

export const fetchRemsConmonWatchlistValues = createAsyncThunk(
  "exceptionDetails/fetchRemsConmonWatchlistValues",
  async (payload) => {
    let SiteCodeMapping = {
      IB: "IBJFLEET",
      CC: "CCFLEET",
      EW: "EWFLEET",
      CB: "CBFLEET",
      SM: "SOLFLEET"
    }
    const response = await RemsAPI.get(`/conmon/get/${SiteCodeMapping[payload.siteCode]}/${payload.assetId}`);
    return response.data;
  }
);

export const fetchREMSOptions = createAsyncThunk(
  "exceptionDetails/fetchREMSOptions",
  async (_, { dispatch, getState, signal }) => {
    let source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    });
    const response = await api.get(`/rems-options`, {cancelToken: source.token});
    return response.data;
  }
);


export const fetchFunctionalLocations = createAsyncThunk(
  "exceptionDetails/fetchFunctionalLocation",
  async (payload) => {
    const response = await api.get(`/functional-location`, { params: {EquipmentName: payload.EquipmentName} });
    return response.data;
  }
);

export const fetchExceptionHistory = createAsyncThunk(
  "exceptionDetails/fetchExceptionHistory",
  async (payload) => {
    const response = await api.get(`/history`, {
      params: payload,
    });
    return response.data;
  }
);

export const fetchExceptionManagementHistory = createAsyncThunk(
  "exceptionDetails/fetchExceptionManagementHistory",
  async (payload) => {
    const response = await api.get(`/management-history`, {
      params: payload,
    });
    return response.data;
  }
);

export const fetchREMSDetails = createAsyncThunk(
  "exceptionDetails/fetchREMSDetails",
  async (payload) => {
    const response = await RemsAPI.get(`/conmon/get/${payload.remsId}`);
    return response.data;
  }
);

