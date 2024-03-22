import { configureStore, getDefaultMiddleware  } from "@reduxjs/toolkit";
import exceptionDetailsReducer from "./exception-details/exceptionDetailsSlice";
import exceptionDetailsHistoryReducer from "./exception-details-history/exceptionDetailsHistorySlice";
import dashboardAssetsReducer from "./dashboard/dashboardSlice";
import customFilterReducer from "./custom-filter/customFilterSlice";
import appMenuReducer from "./appMenuLayout/AppMenuSlice";
import historyTableReducer from "./history-table/historyTableSlice";
import summaryTableReducer from "./summary-table/summaryTableSlice";
import summaryTableReducerV1 from "./summaryV1-table/summaryV1TableSlice";
import subHeaderReducer from "./sub-header/subHeaderSlice";
import userPreferencesReducer from "./user-preferences/userPreferencesSlice";
import authenticationReducer from "./authentication/authenticationSlice";
import recommendationReducer from "./recommendation/RecommendationSlice";
import fleetDetailsReducer from "./fleet-details/fleetDetailsSlice"

export default configureStore({
  reducer: {
    
    exceptionDetailsReducer,
    dashboardAssetsReducer,
    customFilterReducer,
    appMenuReducer,
    summaryTableReducer,
    historyTableReducer,
    summaryTableReducerV1,
    subHeaderReducer,
    userPreferencesReducer,
    authenticationReducer,
    recommendationReducer,
    fleetDetailsReducer,
    exceptionDetailsHistoryReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});
