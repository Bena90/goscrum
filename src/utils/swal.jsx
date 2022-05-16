import Swal from 'sweetalert2'

export const swal = () =>{
    Swal.fire ({
        title: "Credenciales Inválidas",
        text: "Por favor introduzca credenciales válidas",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 5000,
        timerProgressBar: true,
    })
}