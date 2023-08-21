import axios from "axios";
import { getDataRequest } from "./sesionService";

const BASE_URL = process.env.REACT_APP_API_URL;

const HttpClient = () => {
    axios.interceptors.request.use((config) => {
        document.getElementById('spinnerCustom').classList.remove('visually-hidden');
        const datRequest = getDataRequest();
        if (datRequest) {
            const headers = { ...config.headers, ...datRequest };
            config.headers = headers;
        }
        return config;
    })
    
    axios.interceptors.response.use((response) => {
        document.getElementById('spinnerCustom').classList.add('visually-hidden');
        return response;
    }, (error) => {
        document.getElementById('spinnerCustom').classList.add('visually-hidden');
        return Promise.reject(error);
    });
    return axios;
}
export default HttpClient;