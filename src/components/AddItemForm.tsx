import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm = React.memo (({callback, ...props}: AddItemFormPropsType) => {
    console.log("AddItemForm")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim() !== "") {
            callback(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
             if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <TextField
                variant={"outlined"}
                size={"small"}
                label={"Enter item title"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
                error={error}
            />
            <IconButton>
                <AddBox color={"primary"} onClick={addTask}/>
            </IconButton>

            {error && <div className="error-message">{"Title is required"}</div>}
        </div>
    );
});

