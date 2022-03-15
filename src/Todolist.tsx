import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";
import {TasksStateType, TodolistsType} from "./AppWithRedux";
import {ChangeFilterTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {Task} from "./components/Task";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    // tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    // changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListID: string
    removeTodo: (todoListID: string) => void
    updateTask: (todolistID: string, taskID: string, title: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = React.memo ((props: PropsType) => {

    console.log("Todo")
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolist)
    const todolist =  todolists.filter(m => props.todoListID === m.id)





    const todolistTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.task[props.todoListID])

    let tasksForTodolist = todolistTasks;

    if (todolist) {
        if (todolist[0].filter === "active") {
            tasksForTodolist = todolistTasks.filter(t => t.isDone === false);
        } else
        if (todolist[0].filter === "completed") {
            tasksForTodolist = todolistTasks.filter(t => t.isDone === true);
        }
    }



    const dispatch = useDispatch()


    const onAllClickHandler = useCallback(() => dispatch(ChangeFilterTodolistAC(props.todoListID, "all")), [props.todoListID])
    const onActiveClickHandler = useCallback(() => dispatch(ChangeFilterTodolistAC(props.todoListID, "active")), [props.todoListID])
    const onCompletedClickHandler = useCallback(() => dispatch(ChangeFilterTodolistAC(props.todoListID, "completed")), [props.todoListID])

    let onClickHandlerForDeleteTodo = () => {
        props.removeTodo(props.todoListID)
    }

    const updateTodolistTitleHandler = useCallback((title: string) => {
            props.updateTodolistTitle(props.todoListID, title)
        }, [props.updateTodolistTitle, props.todoListID])


    // let onClickHandlerForDeleteTodo = () => {
    //     const newTodoLists = RemoveTodolistAC(props.todoListID)
    //     dispatch(newTodoLists) // экшн идет сразу в два редюсера, т.к. запускаются все редюсеры
    //     // dispatch(RemoveTodolistAC(props.todoListID))
    // }
    //
    // const updateTodolistTitleHandler = (title: string) => {
    //     dispatch(ChangeTodolistTitleAC(props.todoListID, title))
    // }


    const onClickHandlerTaskRemove = useCallback ((taskID: string) => {
        props.removeTask(props.todoListID, taskID)
    }, [props.removeTask, props.todoListID])

    // const onClickHandlerTaskRemove = (taskID: string) => {
    //     dispatch(removeTaskAC(props.todoListID, taskID));
    // }

    const callbackHandler = useCallback ((title: string) => {
        props.addTask(props.todoListID, title)
    }, [props.addTask, props.todoListID ])

    // const callbackHandler = useCallback ((title: string) => {
    //     dispatch(addTaskAC(props.todoListID, title))
    // }, [])
    const callbackHandlerForUpdateTask = useCallback ((title: string, taskID: string) => {
        props.updateTask(props.todoListID, taskID, title)
    }, [props.updateTask, props.todoListID])

    // const callbackHandlerForUpdateTask = (title: string, taskID: string) => {
    //     dispatch(changeTaskTitleAC(props.todoListID, taskID, title))
    // }


    const onChangeHandler = useCallback ( (e: ChangeEvent<HTMLInputElement>, tID: string) => {
        props.changeTaskStatus(props.todoListID, tID, e.currentTarget.checked);

    },[props.changeTaskStatus, props.todoListID])
    //
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, tID: string) => {
    //     dispatch(changeTaskStatusAC(props.todoListID, tID, e.currentTarget.checked))
    // }




    return <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"

    }}>

        <Typography
            variant={"h5"}
            align={"center"}
            style={{fontWeight: "bold"}}>

            <EditableSpan title={todolist[0].title} callback={updateTodolistTitleHandler}/>
            <IconButton>
                <DeleteForeverOutlinedIcon fontSize={"medium"} onClick={onClickHandlerForDeleteTodo}/>
            </IconButton>
        </Typography>


        <AddItemForm callback={callbackHandler}/>

        <List>
            {
                tasksForTodolist.map(t => <Task id={t.id}
                                                key={t.id}
                                                title={t.title}
                                                isDone={t.isDone}
                                                callbackHandlerForUpdateTask={callbackHandlerForUpdateTask}
                                                onChangeHandler={onChangeHandler}
                                                onClickHandlerTaskRemove={onClickHandlerTaskRemove}


                />)}



        </List>
        <div>
            <ButtonGroup variant="contained" size={"small"} fullWidth>
                <Button color={todolist[0].filter === 'all' ? "primary" : "default"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={todolist[0].filter === 'active' ? "primary" : "default"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={todolist[0].filter === 'completed' ? "primary" : "default"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>


        </div>
    </div>
})


