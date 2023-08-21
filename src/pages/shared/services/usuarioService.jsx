import { catchError, thenResponse } from "../utils/utilities";
import HttpAxios from "./axiosService";

const URI = process.env.REACT_APP_API_URL;

const login = async (data) => {
    return HttpAxios().post(`${URI}usuario/login/`, data)
        .then(thenResponse).catch(catchError);
};
export { login };