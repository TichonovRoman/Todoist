import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


type ActionType = ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeFilterTodolistAC>
    | ReturnType<typeof AddTodolistAC>


export const todolistReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            let newTodoLists: Array<TodolistsType> = [...state].filter(f => f.id !== action.todolistId)
            return newTodoLists
        case "CHANGE-FILTER":
            let filteredTodoLists: Array<TodolistsType> = state.map(m => m.id === action.todolistId ? {...m, filter: action.value} : m)
            return filteredTodoLists
        case "ADD-TODOLIST":
            let expandedTodoLists: Array<TodolistsType> = [{id: action.todolistID, title: action.title, filter: "all"}, ...state]
            return expandedTodoLists

        default:
            return state
    }

}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: todolistId
    } as const
}

export const ChangeFilterTodolistAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: "CHANGE-FILTER",
        todolistId: todolistId,
        value: value
    } as const
}

export const AddTodolistAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        todolistID: todolistID,
        title: title
    } as const
}