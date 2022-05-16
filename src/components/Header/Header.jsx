import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './Header.styles.css';

export const Header = () => {
    const navigate = useNavigate();
    console.log( process.env.NODE_ENV)
    const { tasks } = useSelector (state => state.tasksReducer)

    const handleLogOut = () => {
        localStorage.removeItem ('user')
        localStorage.removeItem ('token')
        navigate ('/login', { replace: true })
    }
    return (
        <header>
            <img src="/img/logo.png" alt="Logo" />
            <span>{process.env.NODE_ENV} en puerto {process.env.REACT_APP_PORT}</span>
            <div className="wrapper_right_header">
                <div>
                    <button onClick={()=> navigate ('/donate', { replace: true })}>
                        Quiero Donar
                    </button>
                </div>
                <div className='black'>Tareas creadas: {tasks?.length}</div>
                <div className='black'> {localStorage.getItem('user')}</div>
                <div onClick={handleLogOut}> Cerrar Sesion </div>
            </div>
        </header>    
    )
}