import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import '../Auth.styles.css';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const URL = process.env.REACT_APP_URL

export const Register = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate();
 
    useEffect(() =>{
        fetch(`${URL}/auth/data`)
            .then (response => response.json())
            .then (data => setData(data.result))
    }, [])

    const initialValues = {
        userName: '',
        password: '',
        email: '',
        teamID: '',
        role: '',
        continent: '',
        region: '',
        switch: false,
    } 

    const handleChangeContinent = (e) => {
        console.log(e)
        formik.setFieldValue ('continent',e)
        if (e !== 'America') formik.setFieldValue('region', 'Otro')
    }

    const onSubmit = () => {
        if(!values.switch) values.teamID = uuidv4() 
        console.log(values)

        fetch ((`${URL}/auth/register`), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    userName: values.userName,
                    password: values.password,
                    email: values.email,
                    teamID: values.teamID,
                    role: values.role,
                    continent: values.continent,
                    region: values.region,
                },
            }),
        })
            .then( response => response.json())
            .then( data =>{ 
            navigate ('/registered/' + data?.result?.user?.teamID,{replace: true,})
            console.log (data?.result?.user?.teamID)
            console.log(data)
        }
        )
    }

    const required= '* Campo obligatorio'

    const validationSchema = () =>
    Yup.object().shape({
        userName: Yup.string()
            .min(6, 'Cantidad mínima es 6 caracteres')
            .required(required),
        password: Yup.string()
            .required(required),
        email: Yup.string().email('Ingresa mail válido')
            .required(required),
        role: Yup.string()
            .required(required),
        continent: Yup.string()
            .required(required),
        region: Yup.string()
            .required(required),
})

    const formik = useFormik ({ initialValues, onSubmit, validationSchema })

    const { handleChange, handleSubmit, handleBlur, touched, values, errors } = formik

    return (
        <div className="auth">
            <form onSubmit={handleSubmit}>
                <h1> Registro </h1>
                <div>
                    <label htmlFor="userName">Nombre de Usuario</label>
                    <input
                        id='userName'
                        type='text'
                        name='userName'
                        onChange={handleChange}
                        value={values.userName}
                        onBlur={handleBlur}
                        className={errors.userName ? 'error' : ''}
                    />
                    {errors.userName && touched.userName &&<span className="error-message"> {errors.userName} </span>}   
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && touched.password &&<span className="error-message"> {errors.password} </span>}   
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && touched.email &&<span className="error-message"> {errors.email} </span>}   
                </div>
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                value={values.switch}
                                onChange= {()=>
                                    formik.setFieldValue('switch', !formik.values.switch)
                                }
                                name='switch'
                                color='secondary'
                            />
                        }
                        label='Ya tengo equipo'
                    />
                </div>
                {values.switch &&
                    <div>
                        {console.log(values.switch)}
                        <label htmlFor="text">Team ID</label>
                        <input 
                            type="text" 
                            name='teamID' 
                            value={values.teamID} 
                            onChange={handleChange} 
                        />
                    </div>
                }
                <div>
                    <label htmlFor="role">Role</label>
                    <select
                        name='role'
                        onChange={handleChange}
                        value={values.role}
                        onBlur={handleBlur}
                        className={errors.role ? 'error' : ''}
                    > 
                    <option value=""> Elige un rol </option>
                    {data?.Rol?.map(option => (
                        <option key={option} value={option}>{option}</option>))}
                    </select>
                    {errors.role && touched.role &&<span className="error-message"> {errors.role} </span>}   
                </div>
                <div>
                    <label htmlFor="continent">Continent</label>
                    <select
                        name='continent'
                        onChange={e => handleChangeContinent(e.currentTarget.value)}
                        value={values.continent}
                        onBlur={handleBlur}
                        className={errors.continent ? 'error' : ''}
                    > 
                    <option value=""> Elige un continente </option>
                    {data?.continente?.map(option => (
                        <option key={option} value={option}>{option}</option>))}
                    </select>
                    {errors.continent && touched.continent &&<span className="error-message"> {errors.continent} </span>}   
                </div>
                {values.continent === 'America' && 
                    <div>
                        <label htmlFor="region">Región</label>
                        <select
                            name='region'
                            onChange={handleChange}
                            value={values.region}
                            onBlur={handleBlur}
                            className={errors.region ? 'error' : ''}
                        > 
                        <option value=""> Elige una región </option>
                        {data?.region?.map(option => (
                            <option key={option} value={option}>{option}</option>))}
                        </select>
                        {errors.region && touched.region &&<span className="error-message"> {errors.region} </span>}   
                    </div>
                }

                <div>
                    <button type='submit'> Registrar </button>
                </div>
                <div>
                    <Link to ='/login'> Iniciar Sesión </Link>
                </div>
            </form>
        </div>
    )
}
