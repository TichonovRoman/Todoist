import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, taskId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListID: string
    removeTodo: (todoListID: string) => void
    updateTask: (todolistID: string, taskID: string, title: string) => void
    updateTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

    let onClickHandlerForDeleteTodo = () => {
        props.removeTodo(props.todoListID)
    }
    const onClickHandlerTaskRemove = (taskID: string) => {
        props.removeTask(props.todoListID, taskID)
    }
    const callbackHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }
    const callbackHandlerForUpdateTask = (title: string, taskID: string) => {
        props.updateTask(props.todoListID, taskID, title)
    }
    const updateTodolistTitleHandler = (title: string) => {
        props.updateTodolistTitle(props.todoListID, title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, tID: string) => {
        props.changeTaskStatus(props.todoListID, tID, e.currentTarget.checked);
    }



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

            <EditableSpan title={props.title} callback={updateTodolistTitleHandler}/>
            <IconButton>
                <DeleteForeverOutlinedIcon fontSize={"medium"} onClick={onClickHandlerForDeleteTodo}/>
            </IconButton>
        </Typography>


        <AddItemForm callback={callbackHandler}/>

        <List>
            {
                props.tasks.map(t => {

                    return <ListItem
                        disableGutters
                        divider
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}>

                        <div>
                            <Checkbox
                                color="primary"
                                size="small"
                                onChange={(e)=>onChangeHandler(e, t.id)}
                                checked={t.isDone}
                                style={{marginRight: "15px"}}
                            />
                            <EditableSpan title={t.title}
                                          callback={(title) => callbackHandlerForUpdateTask(title, t.id)}/>

                        </div>

                        <IconButton>

                            <HighlightOffIcon fontSize={"small"}
                                              onClick={() => onClickHandlerTaskRemove(t.id)}>x</HighlightOffIcon>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <ButtonGroup variant="contained" size={"small"} fullWidth>
                <Button color={props.filter === 'all' ? "primary" : "default"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === 'active' ? "primary" : "default"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === 'completed' ? "primary" : "default"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>


        </div>
    </div>
}
