const VARIABLES_SESION = {
    uid: 'uid',
    nombreUsuario: 'nombreUsuario',
    nombreCompleto: 'nombreCompleto',
    token: 'token',
}

const getItemSesion = (atributo) => sessionStorage.getItem(atributo);

const establecerVariablesSesion = (data) => {
    sessionStorage.setItem(VARIABLES_SESION.uid, data.uid);
    sessionStorage.setItem(VARIABLES_SESION.nombreUsuario, data.nombreUsuario);
    sessionStorage.setItem(VARIABLES_SESION.nombreCompleto, data.nombreCompleto);
    sessionStorage.setItem(VARIABLES_SESION.token, data.token);
}

const limpiarVariablesSesion = () => {
    sessionStorage.clear();
}

const isAuthenticated = () => {
    const array = Object.keys(VARIABLES_SESION);
    for (let i = 0; i < array.length; i++) {
        if (!sessionStorage.getItem(VARIABLES_SESION[array[i]]))
            return false;
    }
    return true;
}

const getDataRequest = () => {
    const token = getItemSesion(VARIABLES_SESION.token);
    const uid = getItemSesion(VARIABLES_SESION.uid);
    if (!uid && !token)
        return null;

    return {
        Authorization: `Bearer ${token}`,
        uid: uid
    }
}

const getDataUser = () => {
    return {
        username: getItemSesion(VARIABLES_SESION.nombreUsuario),
        name: getItemSesion(VARIABLES_SESION.nombreCompleto)
    }
}

export { establecerVariablesSesion, limpiarVariablesSesion, isAuthenticated, getDataUser, getItemSesion, getDataRequest };