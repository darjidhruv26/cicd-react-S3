import axios from "axios";
// import { msalInstance } from "../index";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import { createUser } from "../redux/authentication/authenticationThunk";
import { isFulfilled } from "@reduxjs/toolkit";
import { fetchUserPreferences } from "../redux/user-preferences/userPreferencesThunk";

// export const getAccessToken = async () => {

//     let accessToken;
//     await msalInstance.acquireTokenSilent(loginRequest).then((accessTokenResponse) => {

//         accessToken = accessTokenResponse.accessToken;

//     }).catch((error) => {

//         if (error instanceof InteractionRequiredAuthError) {
//             msalInstance.acquireTokenRedirect(loginRequest).then(function (accessTokenResponse) {
//                 accessToken = accessTokenResponse.accessToken;
//             }).catch(function (error) {
//                 console.log(error);
//             });
//         }
//         console.log(error);

//     });
//     return accessToken;
// }

export const getRemsAccessToken = async () => {

    let baseURL = `${process.env.REACT_APP_REMS_API_URL.replace("v2", "token/v2")}/gettoken/${process.env.REACT_APP_REMS_AUTH_ID}`
    let accessToken;
    await axios.get(baseURL).then(response => {
        accessToken = response.data
    }).catch(err => console.log(err));
    return accessToken;
}

export const createUserAsyncAction = async (dispatch) => {
    const createUserAction = await dispatch(createUser());

    if (isFulfilled(createUserAction)) {
        dispatch(fetchUserPreferences({userId: createUserAction.payload.user_id}));
    }
    return createUserAction;
}