import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType } from 'app/store'
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer'
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from './tasks-reducer'
import { TaskStatuses } from 'api/todolists-api'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import {contentSelectors} from "selectors/index";

export const TodolistsList: React.FC = () => {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(contentSelectors.getTodoListsData)
    const tasks = useSelector<AppRootStateType, TasksStateType>(contentSelectors.getTasksData)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(contentSelectors.getIsLoggedInData)


    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [isLoggedIn, dispatch])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId,filter: value})
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [dispatch])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch])


    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])


    if(!isLoggedIn) {
        return <Navigate to={"login"}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(({id, title, entityStatus, filter}) => {
                    //?????????????? ???????????? ?????????????????????????????????? ????????????????
                    let allTodolistTasks = tasks[id]

                    return <Grid item key={id}>
                        <Paper style={{padding: '10px'}} elevation={6}>
                            <Todolist
                                id={id}
                                title={title}
                                entityStatus = {entityStatus}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
