import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/state";
import {TaskType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../reducers/tasks-reducer";

type TaskPropsType = {
    // onChangeHandler: (e: ChangeEvent<HTMLInputElement>, tID: string) => void,
    taskId: string,
    todoListID: string,
    // isDone: boolean,
    // title: string,
    // callbackHandlerForUpdateTask: (title: string, taskID: string) => void,
    // onClickHandlerTaskRemove: (taskID: string) => void,
}

export const TaskRedux = React.memo ((props: TaskPropsType) => {

    const taskItem = useSelector<AppRootStateType, TaskType[]>(state => state.task[props.todoListID].filter(e=> e.id === props.taskId))

    const dispatch = useDispatch()

    console.log("Task")

    const onChangeHandlerHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todoListID, props.taskId, e.currentTarget.checked))

    }, [props.todoListID, props.taskId])

    const callbackHandlerForUpdateTaskHandler = useCallback((title: string) =>{
        dispatch(changeTaskTitleAC(props.todoListID, props.taskId, title))
           }, [props.todoListID, props.taskId])

    const onClickHandlerTaskRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(props.todoListID, props.taskId))

    }, [props.todoListID, props.taskId])




    return <ListItem
        disableGutters
        divider
        className={taskItem[0].isDone ? "is-done" : ""}
        style={{
            display: "flex",
            justifyContent: "space-between"
        }}>

        <div>
            <Checkbox
                color="primary"
                size="small"
                onChange={onChangeHandlerHandler}
                checked={taskItem[0].isDone}
                style={{marginRight: "15px"}}
            />
            <EditableSpan title={taskItem[0].title}
                          callback={callbackHandlerForUpdateTaskHandler}/>

        </div>

        <IconButton>

            <HighlightOffIcon fontSize={"small"}
                              onClick={onClickHandlerTaskRemoveHandler}>x</HighlightOffIcon>
        </IconButton>
    </ListItem>
})
