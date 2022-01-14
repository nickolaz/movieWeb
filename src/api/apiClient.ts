import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AppConfig } from "../config/config";

const axio = axios.create({
    baseURL: AppConfig.apiBaseUrl,
    timeout: AppConfig.apiTimeout,
    headers: { 
        'Content-Type': 'application/json'
    },
});

axio.interceptors.request.use((config: AxiosRequestConfig) => {    
    return config;
});

axio.interceptors.response.use((response: AxiosResponse<any>) => {
    return response;
});

export default axio;