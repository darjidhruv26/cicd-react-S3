export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: process.env.REACT_APP_AUTHORITY,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
    },
    cache: {
        cacheLocation: process.env.REACT_APP_CACHE_LOCATION, // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11
    }
};

export const loginRequest = {
    scopes: [process.env.REACT_APP_SCOPES]
};