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

function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const editTitleTask = (todolistID: string, taskID: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, title))

    }

    function removeTask(todoListID: string, id: string) {
        dispatchToTasks(removeTaskAC(todoListID, id));
    }

    function addTask(todoListID: string, title: string) {

        dispatchToTasks(addTaskAC(todoListID, title))
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(todoListID, taskId, isDone))
    }


    //Change Todolists:


    const addTodolist = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }


    const editTitleTodolist = (todolistID: string, title: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(todolistID, title))

    }

    const removeTodo = (todoListID: string) => {

        const newTodoLists = RemoveTodolistAC(todoListID)
        dispatchToTodolists(newTodoLists)
        dispatchToTasks(RemoveTodolistAC(todoListID))

    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        let newTodolist = ChangeFilterTodolistAC(todoListID, value)
        dispatchToTodolists(newTodolist)
    }


    return (

        <div className="App">
            <ButtonAppBar/>
            <Container fixed={true}>
                <Grid container justifyContent="center" style={{padding: "15px"}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={5} justifyContent="center">
                    {todolists.map((t) => {

                        let tasksForTodolist = tasks[t.id];

                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                        }


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
                                        title={t.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={t.filter}
                                        removeTodo={removeTodo}
                                        updateTask={editTitleTask}
                                        updateTodolistTitle={editTitleTodolist}
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

export default AppWithReducer;
