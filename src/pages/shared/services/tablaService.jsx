import { catchError, thenResponse } from "../utils/utilities";
import HttpClient from "./axiosService";

const URI = process.env.REACT_APP_API_URL;

const getTablaDetalleByCodigos = async (codigos) => {
    return await HttpClient().get(`${URI}tabla/by-codigos/${codigos}`)
        .then(thenResponse).catch(catchError);
};
export { getTablaDetalleByCodigos };