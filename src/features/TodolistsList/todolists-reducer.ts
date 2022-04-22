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

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks

type ThunkType = ThunkAction<void, AppRootStateType, unknown, TodolistsActionsType | TasksActionsType | AppActionsType>
export const fetchTodolistsTC = (): ThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
                return res.data
            })
            .then((todos)=> {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
               }
}

export const changeTodolistEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
    return {
        type: `CHANGE-TODOLIST-ENTITY-STATUS`,
        todoId,
        entityStatus,
    } as const
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
                } else {
                    dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error"))
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC("idle"))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                } else {
                    dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error"))
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC("idle"))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title))
                } else {
                    dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : "Some error"))
                }
            })
            .catch((err: AxiosError) => {
                dispatch(setAppErrorAC(err.message))
            })
            .finally(() => {
                dispatch(setAppStatusAC("idle"))
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
