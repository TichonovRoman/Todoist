import React, {ChangeEvent} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
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
    return <ListItem
        disableGutters
        divider
        key={props.id}
        className={props.isDone ? "is-done" : ""}
        style={{
            display: "flex",
            justifyContent: "space-between"
        }}>

        <div>
            <Checkbox
                color="primary"
                size="small"
                onChange={(e)=>props.onChangeHandler(e, props.id)}
                checked={props.isDone}
                style={{marginRight: "15px"}}
            />
            <EditableSpan title={props.title}
                          callback={(title) => props.callbackHandlerForUpdateTask(title, props.id)}/>

        </div>

        <IconButton>

            <HighlightOffIcon fontSize={"small"}
                              onClick={() => props.onClickHandlerTaskRemove(props.id)}>x</HighlightOffIcon>
        </IconButton>
    </ListItem>
})
