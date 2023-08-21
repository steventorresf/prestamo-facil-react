import { catchError, thenResponse } from "../utils/utilities";
import HttpClient from "./axiosService";

const URI = process.env.REACT_APP_API_URL;

const getByFilters = async (pageNumber, pageSize, text) => {
    return await HttpClient().get(`${URI}cliente`, { params: { pageNumber, pageSize, text } })
        .then(thenResponse).catch(catchError);
}

const create = async (data) => {
    return await HttpClient().post(`${URI}cliente`, data)
        .then(thenResponse).catch(catchError);
}

const update = async (_id, data) => {
    return await HttpClient().put(`${URI}cliente/${_id}`, data)
        .then(thenResponse).catch(catchError);
}
export { getByFilters, create, update };