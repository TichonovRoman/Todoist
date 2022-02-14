import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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

    const updateTodolistTitleHandler = (title: string)=> {
         props.updateTodolistTitle(props.todoListID, title)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} callback={updateTodolistTitleHandler}/>
            <button onClick={onClickHandlerForDeleteTodo}>X</button>
        </h3>

        <AddItemForm callback={callbackHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title = {t.title} callback={(title)=>callbackHandlerForUpdateTask(title, t.id)}/>
                        <button onClick={() => onClickHandlerTaskRemove(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
