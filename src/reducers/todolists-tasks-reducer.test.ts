import {TasksStateType, TodolistsType} from "../AppWithRedux";
import {tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, todolistReducer} from "./todolists-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistsType> = [];
    const action = AddTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState);

    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistID);
    expect(idFromTodolists).toBe(action.payload.todolistID);
    expect(idFromTodolists).toBe(idFromTasks);

});