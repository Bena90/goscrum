import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

import './TaskForm.styles.css';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_URL;

export const TaskForm = () => {
    const initialValues = {
        title: '',
        status: '',
        importance: '',
        description: '',
    } 

    const onSubmit = () => {
        const { title, status, importance, description } = values
        fetch ((`${URL}/task`), {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem ("token"),
            },
            body: JSON.stringify({
                task: {
                    title,
                    importance,
                    status,
                    description
                },
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            toast("Tu tarea se creó correctamente!");
        })
        .catch ((error) => console.log(error))
        .finally(()=> resetForm ())
    }

    const required= '* Campo obligatorio'

    const validationSchema = () =>
            Yup.object().shape({
                title: Yup.string()
                    .min(6, 'Cantidad mínima es 6 caracteres')
                    .required(required),
                status: Yup.string()
                    .required(required),
                importance: Yup.string()
                    .required(required),
                description: Yup.string()
                    .required(required)
        })

    const formik = useFormik ({initialValues, validationSchema, onSubmit});

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, resetForm} = formik;

    return(
        <section className="task-form">
            <h2>Crear Tarea</h2>
            <p>Crea tus tareas:</p>
            <form onSubmit={handleSubmit} >
                <div>
                    <div>
                        <input 
                            name='title'
                            placeholder='Ingresá un título'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.title && touched.title ? 'error' : ''}
                            value={values.title}
                        />
                        {errors.title && touched.title && <span className="error-message"> {errors.title} </span>}
                    </div>
                    <div>
                        <select 
                            name='status' 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            className={errors.status && touched.status ? 'error' : ''}
                            value={values.status}
                        >
                            <option value=""> Seleccionar estado </option>
                            <option value="NEW"> Nueva </option>
                            <option value="IN PROGRESS">En proceso</option>
                            <option value="FINISHED">Terminada</option>        
                        </select>
                        {errors.status && touched.status && <span className="error-message"> {errors.status} </span>}
                    </div>
                    <div>
                        <select 
                            name='importance' 
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            className={errors.importance && touched.importance ? 'error' : ''}
                            value={values.importance}
                        >
                            <option value=""> Seleccionar prioridad </option>
                            <option value="LOW"> Baja </option>
                            <option value="MEDIUM"> Media </option>
                            <option value="HIGH"> Alta </option>
                        </select>
                        {errors.importance && touched.importance && <span className="error-message"> {errors.importance} </span>}
                    </div>
                </div>
                <div>
                    <textarea 
                        name='description' 
                        onChange={handleChange}  
                        onBlur={handleBlur} 
                        placeholder='Description...'
                        className={errors.description && touched.description ? 'error' : ''}
                        value={values.description}
                    />
                </div>
                    {errors.description && touched.description && <span className="error-message"> {errors.description} </span>}
                <button type ='submit'> Guardar </button>
            </form>
            <ToastContainer />
        </section>
    )
}