import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { swal } from '../../../../utils/swal'

//Styles
import '../Auth.styles.css';

const URL = process.env.REACT_APP_URL

export const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        userName: '',
        password: ''
    } 

    const onSubmit = () => {
        const { userName, password } = formik.values
        console.log (formik.values)
        console.log(`${URL}/auth/login`)

        fetch ((`${URL}/auth/login`), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userName, password}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 200) {
                localStorage.setItem('token', data?.result?.token)
                localStorage.setItem('user', data?.result?.user.userName)
                navigate('/', {replace: true})
            } else{
                console.log(data.status_code)
                swal ();
            }
        })
        .catch((error) => console.log('No se puede man!'))   
    }

    const required= '* Campo obligatorio';

    const validationSchema = () =>
    Yup.object().shape({
        userName: Yup.string()
            .min(6, 'Cantidad mínima es 6 caracteres')
            .required(required),
        password: Yup.string()
            .required(required),
})

    const formik = useFormik ({initialValues, onSubmit, validationSchema});

    return (
        <div className='auth'>
            <form onSubmit={formik.handleSubmit}>
                <h1> Iniciar Sesión</h1>
                <div>
                    <label htmlFor="text">Nombre de Usuario</label>
                    <input
                        type='text'
                        name='userName'
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                        className={formik.errors.userName ? 'error' : ''}
                    />
                    {formik.errors.userName && formik.touched.userName &&<span className="error-message"> {formik.errors.userName} </span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        className={formik.errors.password ? 'error' : ''}
                        />
                    {formik.errors.password && formik.touched.password && <span className="error-message"> {formik.errors.password} </span>}
                </div>
                <div>
                    <button className="" type='submit'> Enviar </button>
                </div>
                <div>
                    <Link to ='/register'> Registrarme </Link>
                </div>
            </form>
        </div>
    )
}

