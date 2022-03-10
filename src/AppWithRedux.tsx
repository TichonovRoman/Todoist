import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolist)

    const dispatch = useDispatch()

    // const editTitleTask = (todolistID: string, taskID: string, title: string) => {
    //     dispatch(changeTaskTitleAC(todolistID, taskID, title))
    //
    // }

    // function removeTask(todoListID: string, id: string) {
    //     dispatch(removeTaskAC(todoListID, id));
    // }

    // function addTask(todoListID: string, title: string) {
    //
    //     dispatch(addTaskAC(todoListID, title))
    // }

    // function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
    //     dispatch(changeTaskStatusAC(todoListID, taskId, isDone))
    // }


    //Change Todolists:


    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    // const editTitleTodolist = (todolistID: string, title: string) => {
    //     dispatch(ChangeTodolistTitleAC(todolistID, title))
    //
    // }

    // const removeTodo = (todoListID: string) => {
    //
    //     const newTodoLists = RemoveTodolistAC(todoListID)
    //     dispatch(newTodoLists)
    //     dispatch(RemoveTodolistAC(todoListID))
    //
    // }

    // function changeFilter(todoListID: string, value: FilterValuesType) {
    //     let newTodolist = ChangeFilterTodolistAC(todoListID, value)
    //     dispatch(newTodolist)
    // }


    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed={true}>
                <Grid container justifyContent="center" style={{padding: "15px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={5} justifyContent="center">
                    {todolists.map((t) => {

                        return (

                            <Grid item key={t.id}>
                                <Paper elevation={6} style={{
                                    // display: "inline-block",
                                    padding: "12px",
                                    minWidth: "300px",
                                    width: "auto",
                                    minHeight: "400px",
                                    background: "whitesmoke",
                                    // marginRight: "50px",
                                    // marginBottom: "50px",

                                }}>
                                    <Todolist
                                        todoListID={t.id}
                                        // title={t.title}
                                        // tasks={tasksForTodolist}
                                        // removeTask={removeTask}
                                        // changeFilter={changeFilter}
                                        // addTask={addTask}
                                        // changeTaskStatus={changeStatus}
                                        // filter={t.filter}
                                        // removeTodo={removeTodo}
                                        // updateTask={editTitleTask}
                                        // updatesTodolistTitle={editTitleTodolist}
                                    />
                                </Paper>
                            </Grid>


                        )

                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
