import Swal from "sweetalert2"

export const AlertSuccess = ({ title, message, methodOk }) => {
    Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: title || 'Operación exitosa',
        html: message || 'La operación se realizó satisfactoriamente',
        focusConfirm: false,
        showCancelButton: false
    }).then((result) => {
        if (result.isConfirmed && methodOk)
            methodOk();
    })
}

export const AlertError = ({ title, message, methodOk }) => {
    Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: title || 'Error',
        html: message || 'Ha ocurrido un error inesperado, por favor contacte a su administrador',
        focusConfirm: false,
        showCancelButton: false
    }).then((result) => {
        if (result.isConfirmed && methodOk)
            methodOk();
    })
}