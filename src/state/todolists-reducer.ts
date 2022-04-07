import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {addTaskAC} from "./tasks-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodosActionType

export type GetTodosActionType = ReturnType<typeof getTodoAC>

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "GET-TODOS":
            return action.todos.map(todo => {
                return {...todo, filter: "all"}
            })

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const getTodoAC = (todos: Array<TodolistType>) => {
    return {
        type: "GET-TODOS",
        todos
    } as const
}


export const getTodoThunkCreator = (dispatch: any, getState: any): void => {
    todolistsAPI.getTodolists()
        .then((response) => {
            dispatch(getTodoAC(response.data))
        })

}


export const deleteTodoTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0)
                    dispatch(removeTodolistAC(todolistId))

            })
            .catch((error) => {
                return
                alert("Что-то пошло не так")
            })
    }
}

export const addTodoTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0)
                    dispatch(addTodolistAC(res.data.data.item))

            })
            .catch((error) => {
                alert("Что-то пошло не так")
            })
    }
}

export const updateTodolistTitleTC = (todolisId: string, title: string) => (dispatch: Dispatch) => [
    todolistsAPI.updateTodolist(todolisId, title)
        .then((res) => {
            if (res.data.resultCode === 0)
                dispatch(changeTodolistTitleAC(todolisId, title))
        })
        .catch((error) => {

            alert("Что-то пошло не так")
        })
]