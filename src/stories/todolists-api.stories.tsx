import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'cdcf9189-0a6c-4ea6-a766-22c26d9d1d3e'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistApi.getTodos()
            .then((res) => {setState(res.data)})
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const title = "NewTodolist123"
            todolistApi.createTodo(title)
                .then((res) => {setState(res.data)})

        }, [])
        return <div> {JSON.stringify(state)}</div>
    }
export const DeleteTodolist =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = '5700ace4-a475-4db8-9aaf-65f9a4068315';
            todolistApi.deleteTodo(todolistId)
                .then((res) => {
                    setState(res.data);
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }
export const UpdateTodolistTitle =
    () => {
        const [state, setState] = useState<any>(null)
        useEffect(() => {
            const todolistId = '8fa75b10-defb-4c65-ab2e-67c55fb400c4'
            const title = "React+"
            todolistApi.updateTodoTitle(todolistId, title)
                .then((res) => {
                    setState(res.data)
                })
        }, [])
        return <div> {JSON.stringify(state)}</div>
    }