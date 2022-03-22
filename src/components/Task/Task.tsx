import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type TaskPropsType = {
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>, tID: string) => void,
    id: string,
    isDone: boolean,
    title: string,
    callbackHandlerForUpdateTask: (title: string, taskID: string) => void,
    onClickHandlerTaskRemove: (taskID: string) => void,
}

export const Task = React.memo ((props: TaskPropsType) => {

    console.log("Task")

    const onChangeHandlerHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeHandler(e, props.id)
    }, [props.onChangeHandler, props.id])
    const callbackHandlerForUpdateTaskHandler = useCallback((title: string) =>{
        props.callbackHandlerForUpdateTask(title, props.id)
    }, [props.callbackHandlerForUpdateTask, props.id])
    const onClickHandlerTaskRemoveHandler = useCallback(() => {
        props.onClickHandlerTaskRemove(props.id)
    }, [props.onClickHandlerTaskRemove, props.id ])




    return <ListItem
        disableGutters
        divider
        className={props.isDone ? "is-done" : ""}
        style={{
            display: "flex",
            justifyContent: "space-between"
        }}>

        <div>
            <Checkbox
                color="primary"
                size="small"
                onChange={onChangeHandlerHandler}
                checked={props.isDone}
                style={{marginRight: "15px"}}
            />
            <EditableSpan title={props.title}
                          callback={callbackHandlerForUpdateTaskHandler}/>

        </div>

        <IconButton>

            <HighlightOffIcon fontSize={"small"}
                              onClick={onClickHandlerTaskRemoveHandler}>x</HighlightOffIcon>
        </IconButton>
    </ListItem>
})
