import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './authentication/authConfig';
import { initLoader } from "./utils/Loader"
import './index.css';
import "axios-progress-bar/dist/nprogress.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/scss/react-style.scss"

// export const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));
initLoader();

root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <MsalProvider instance={msalInstance}> */}
        <App />
      {/* </MsalProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);