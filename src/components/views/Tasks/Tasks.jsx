import { useState, useEffect } from 'react'
import { Header } from '../../Header/Header';
import { TaskForm } from '../../TaskForm/TaskForm';
import { Card } from '../../Card/Card'
import { useResize } from '../../../hooks/useResize'
import {Radio, RadioGroup, FormControlLabel, FormControl} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux'
import { getTasks, deleteTask, editTaskStatus } from '../../../store/actions/tasksActions';
import debounce from 'lodash/debounce'
import Skeleton from 'react-loading-skeleton'

//Styles for
import 'react-loading-skeleton/dist/skeleton.css'
import './Tasks.styles.css';

export const Tasks = () =>{
    const [ list, setList ] = useState (null);
    const [ renderList, setRenderList ] = useState (null);
    const [ tasksFromWho, setTaskFromWho ] = useState ('ALL')
    const [ search, setSearch ] = useState ('');
    const { isPhone } = useResize();
    const dispatch = useDispatch()
    
    const {loading, error, tasks} = useSelector (state => {
        return state.tasksReducer
    })

    useEffect(() => {
        dispatch( getTasks(tasksFromWho ==='ME' ? '/me' : '' ))
    }, [tasksFromWho, dispatch])
    
    useEffect(() => {
        if(tasks?.length){
            setList (tasks)
            setRenderList (tasks)
        }
    }, [tasks] )
    
    useEffect(() => {
        if (search.length > 0) {
            setRenderList (list.filter(data => data.title.startsWith(search)))
        }else{
            setRenderList (list)
        }
    }, [search])

    if (error) return <div>Hay un error {error}</div>
    
    const renderAllCards = () =>{
        return renderList?.map (data => <Card key={data.id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardsStatus} /> )
    }

    const renderColumnCards = (text) =>{
        return renderList
            ?.filter(data => data.status === text)
            .map (data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardsStatus}/> )
    }

    const handleChangeImportance = (e) =>{
        if (e.currentTarget.value === 'ALL') setRenderList (list)
        else
            setRenderList (
                list.filter(data => data.importance === e.currentTarget.value)
            );
    }

    const handleDelete = (id) => dispatch (deleteTask (id))

    const handleEditCardsStatus = (data) => dispatch (editTaskStatus (data))

    const handleSearch = debounce((e) => {setSearch (e?.target?.value)}, 1000)

    return(
    <>
        <Header/>
        <main id="tasks">
            <TaskForm/>
            <section className="wrapper_list">
                <div className="list_header">
                    <h2>Mis Tareas</h2>
                    <div className="filters">
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                onChange={(e)=>{setTaskFromWho(e.currentTarget.value)}}
                            >
                                <FormControlLabel
                                    value="ALL"
                                    control={<Radio />}
                                    label="Todas"
                                />
                                <FormControlLabel
                                    value="ME"
                                    control={<Radio />}
                                    label="Mis tareas" />
                            </RadioGroup>
                        </FormControl>
                        <div className="search">
                            <input 
                                className="search-control"
                                type="text"
                                placeholder="Buscar por título..."
                                onChange={handleSearch}
                            />
                        </div>
                        <select 
                            name="importance" 
                            onChange={handleChangeImportance}
                            className="select-control"
                        >
                            <option value="">Seleccionar prioridad</option>
                            <option value="ALL">Todas</option>
                            <option value="LOW">Baja</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                    </div>
                </div>
                {isPhone ? (
                    (renderList?.length === 0) ? <div>No hay tareas asignadas</div>
                        : loading ? <Skeleton/> :
                        <div className="list">
                            {renderAllCards()}
                        </div>
                ) : (
                    <div className="list_group">
                        {(renderList?.length === 0) ? <div>No hay tareas asignadas</div>
                         : loading ? <Skeleton height={90}/> :
                        <>
                            <div className="list ">
                                <h4> Nuevas </h4>
                                {renderColumnCards('NEW')}
                            </div>
                            <div className="list">
                                <h4> En Progreso </h4>
                                {renderColumnCards('IN PROGRESS')}
                            </div>
                            <div className="list">
                                <h4> Terminadas </h4>
                                {renderColumnCards('FINISHED')}
                            </div>
                        </>
                        }
                </div>
                )}
            </section>

        </main>
    </>
) 
}