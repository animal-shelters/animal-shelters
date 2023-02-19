import axios from "axios";

export const backendBaseUrl = 'https://localhost/';

const axiosInstance = axios.create({
    baseURL: backendBaseUrl
});

export default axiosInstance;
