import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm = React.memo (({callback, ...props}: AddItemFormPropsType) => {
    console.log("Add")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (title.trim() !== "") {
            callback(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
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
                error={!!error}
            />
            <IconButton>
                <AddBox color={"primary"} onClick={addTask}/>
            </IconButton>

            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

