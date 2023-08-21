import { AlertError } from "../services/alertService";
import { limpiarVariablesSesion } from "../services/sesionService";

const thenResponse = (res) => {
    return { isSuccess: true, data: res.data };
}

const catchError = (error) => {
    const data = error?.response?.data;
    AlertError({
        title: data?.title,
        message: data?.message,
        methodOk: () => {
            if (error?.response?.status === 401) {
                limpiarVariablesSesion();
                window.location.href = '/login';
            }
        }
    });
    return { isSuccess: false };
}

export { thenResponse, catchError }