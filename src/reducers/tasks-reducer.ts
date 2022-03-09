import {FilterValuesType, TasksStateType, TodolistsType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

export type RemoveTaskACActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistID: string

}

export type AddTaskACActionType = {
    type: "ADD-TASK"
    todolistID: string
    title: string

}

export type ChangeTaskStatusACActionType = {
    type: "CHANGE-TASK-STATUS"
    todolistID: string
    taskID: string
    isDone: boolean
}
export type ChangeTaskTitleACActionType = {
    type: "CHANGE-TASK-TITLE"
    todolistID: string
    taskID: string
    title: string
}


type ActionsType = RemoveTaskACActionType
    | AddTaskACActionType
    | ChangeTaskStatusACActionType
    | ChangeTaskTitleACActionType
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof RemoveTodolistAC>


const initialState: TasksStateType = {
    ["todolistID1"]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    ["todolistID2"]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID
                    ? {...t, isDone: action.isDone}
                    : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID
                    ? {...t, title: action.title}
                    : t)
            }

        case "ADD-TODOLIST":
            return {
                ...state, [action.payload.todolistID]: []
            }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        }


        default:
            return state
    }

}

export const removeTaskAC = (todolistID: string, taskId: string): RemoveTaskACActionType => {
    return {type: "REMOVE-TASK", todolistID: todolistID, taskId: taskId}
}

export const addTaskAC = (todolistID: string, title: string): AddTaskACActionType => {
    return {type: "ADD-TASK", todolistID, title}
}
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusACActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistID, taskID, isDone}
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleACActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistID, taskID, title}
}

