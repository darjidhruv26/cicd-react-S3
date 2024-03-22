import axios from "axios";
import {getRemsAccessToken} from "../authentication/authUtils"

const instance = axios.create({
    baseURL: process.env.REACT_APP_REMS_API_URL
})

instance.interceptors.request.use(async function (config) {
    const accessToken = getRemsAccessToken();
    await accessToken.then(token => {
        config.headers.authorization = `Bearer ${token}`;
    });
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;