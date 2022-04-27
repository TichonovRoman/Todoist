import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
    AppActionsType,
    RequestStatusType,
    SetAppActionsTypes,
    setAppErrorAC,
    SetAppErrorTypes,
    setAppStatusAC
} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {fetchTasksTC, TasksActionsType} from "./tasks-reducer";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = []


const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }

        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})

        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoId: string, entityStatus: RequestStatusType }>) {
            debugger
            const index = state.findIndex(tl => tl.id === action.payload.todoId)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})


export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC,
} = slice.actions


type ThunkType = ThunkAction<void, AppRootStateType, unknown, TodolistsActionsType | TasksActionsType | AppActionsType>
export const fetchTodolistsTC = (): ThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //включаем прелоадер
        dispatch(setAppStatusAC({status: "loading"}))
        //дизейблим кнопку удаления у этого тудулиста
        dispatch(changeTodolistEntityStatusAC({todoId: todolistId, entityStatus: "loading"}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {

                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC({id: todolistId}))
                } else {
                    dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
                }
            })
            .catch((err: AxiosError) => {
                debugger
                dispatch(setAppErrorAC({error: err.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: "idle"}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                } else {
                    dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC({error: err.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: "idle"}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id, title}))
                } else {
                    dispatch(setAppErrorAC({error: res.data.messages.length ? res.data.messages[0] : "Some error"}))
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC({error: err.message}))
            })
            .finally(() => {
                dispatch(setAppStatusAC({status: "idle"}))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>;
type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetAppActionsTypes
    | SetAppErrorTypes
    | ChangeTodolistEntityStatusActionType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
}
