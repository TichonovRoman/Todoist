import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistReducer} from "../reducers/todolists-reducer";


const rootReducer = combineReducers({
    task: tasksReducer,
    todolist: todolistReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;