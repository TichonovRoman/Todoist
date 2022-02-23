import {FilterValuesType, TodolistsType} from "../App";

type TodolistsReducerActionType = ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeFilterTodolistAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>


export const todolistReducer = (state: Array<TodolistsType>, action: TodolistsReducerActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            let newTodoLists: Array<TodolistsType> = state.filter(f => f.id !== action.payload.todolistId)
            return newTodoLists
        case "CHANGE-FILTER":
            let filteredTodoLists: Array<TodolistsType> = state.map(m => m.id === action.payload.todolistId ? {
                ...m,
                filter: action.payload.value
            } : m)
            return filteredTodoLists
        case "ADD-TODOLIST":
            let expandedTodoLists: Array<TodolistsType> = [{
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: "all"
            }, ...state]
            return expandedTodoLists
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        default:
            return state
    }

}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId: todolistId
        }

    } as const
}

export const ChangeFilterTodolistAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        payload: {todolistId, value}

    } as const
}

export const AddTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            todolistID: todolistID,
            title: title
        }

    } as const
}

export const ChangeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistID: todolistID,
            title: title
        }

    } as const
}