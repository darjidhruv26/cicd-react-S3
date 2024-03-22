import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
} from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";

import { createUserAsyncAction } from '../authentication/authUtils';

import ExceptionDetails from "../pages/ExceptionDetails/ExceptionDetails";
import DashboardDetails from "../pages/DashboardDetails/DashboardDetails";
import CreateCustomGroup from "../pages/CreateCustomGroup";
import SummaryDetailPage from "../pages/SummaryDetailPage";
import RecommendationPage from "../pages/RecommendationPage";
import FleetDetail from "../pages/FleetDetail";
import EquipmentSelection from "../pages/EquipmentSelection";
import AddCustomSubscription from "../pages/AddCustomSubscription";
import ContactInformation from "../pages/ContactInformation";
import SummaryDetailPageV1 from '../pages/SummaryDetailPageV1';
import HistoryDetailPage from '../pages/HistoryDetailPage';
import Dashboard_chart_table from '../components/DashboardComponent/Dashboard/index';
import { useDispatch } from 'react-redux';

// function RequireAuth({ children }) {
  // const { instance } = useMsal();

//   const accounts = instance.getAllAccounts();
//   if (accounts.length > 0) {
//     instance.setActiveAccount(accounts[0]);
//   }

//   instance.addEventCallback(
//     (event) => {
//       if (
//         event.eventType === EventType.LOGIN_SUCCESS &&
//         event.payload.account
//       ) {
//         const account = event.payload.account;
//         instance.setActiveAccount(account);
//       }
//     },
//     (error) => {
//       console.log("error", error);
//     }
//   );

//   instance
//     .handleRedirectPromise()
//     .then((authResult) => {
//       const account = instance.getActiveAccount();
//       if (!account) {
//         instance.loginRedirect();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   useEffect(() => {
//     if (instance.getActiveAccount()) {
//       createUserAsyncAction(dispatch);
//     }
//   }
//   , []);

//   return children;
// }

const FmgRoutes = () => { 
  const isAuthenticated = true;

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          isAuthenticated && (
            <Navigate to="/summary" replace />
          )
        }
      />
      <Route
        path="/dashboard-create-custom-group/:groupId"
        element={
          
            
              <CreateCustomGroup />
            
          
        }
      />
      <Route
        path="/dashboard-create-custom-group"
        element={
          
            
              <CreateCustomGroup />
            
          
        }
      />
      <Route
        path="/exception-details/:exceptionId"
        element={
          
            
              <ExceptionDetails />
            
          
        }
      />
      <Route
        path="/dashboard"
        element={
          
            // 
              <DashboardDetails />
            // 
          
        }
      />
      <Route
        path="/summary"
        element={
          
            
              <SummaryDetailPage />
            
          
        }
      />
      <Route
        path="/history"
        element={
          
            
              <HistoryDetailPage />
            
          
        }
      />
      <Route
        path="/All-Data"
        element={
          
            
              <Dashboard_chart_table />
            
          
        }
      />
      <Route
        path="/summary-v1"
        element={
          
            
              <SummaryDetailPageV1 />
            
          
        }
      />
      <Route
        path="/recommendation"
        element={
          
            
              <RecommendationPage />
            
          
        }
      />
      <Route
        path="/fleet-detail/:assetName"
        element={
          
            
              <FleetDetail />
            
          
        }
      />
      <Route
        path="/equipment-selection"
        element={
          
            
              <EquipmentSelection />
            
          
        }
      />
      <Route
        path="/add-custom-subscription"
        element={
          
            
              <AddCustomSubscription />
            
          
        }
      />
      <Route
        path="/contact-information"
        element={
          
            
              <ContactInformation />
            
          
        }
      />
    </Routes>
  );
};

export default FmgRoutes;
