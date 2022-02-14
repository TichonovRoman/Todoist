import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        const ListTasks = tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
        setTasks({...tasks, [todolistID]: ListTasks})

    }

    const editTitleTodolist = (todolistID: string, title: string) => {
        const newTodolistsList = todolists.map(tl => tl.id === todolistID ? {...tl, title: title} : tl)
        setTodolists(newTodolistsList)

    }

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(f => f.id !== id)});
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(m => m.id === taskId ? {...m, isDone} : m)})
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => m.id === todoListID ? {...m, filter: value} : m))
    }

    const removeTodo = (todoListID: string) => {

        let newTodoLists = [...todolists].filter(f => f.id !== todoListID)

        setTodolists(newTodoLists)
        console.log(todoListID)
    }

    const addTodolist = (title: string) => {
        const todolistID = v1();
        setTodolists([{id: todolistID, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    }

    return (


        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant="outlined">Login</Button>

                </Toolbar>

            </AppBar>
            <Container fixed={true}>
                <Grid container justifyContent="center" style={{padding: "15px"}} >
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

                            <Grid item  key={t.id}>
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

export default App;
