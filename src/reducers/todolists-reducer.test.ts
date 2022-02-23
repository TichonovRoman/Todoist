import {v1} from "uuid";
import {useState} from "react";
import {TodolistsType} from "../App";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolists-reducer";


test("correct todolist should be removed", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startTodolists: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    let endTodolist = todolistReducer(startTodolists, RemoveTodolistAC(todolistID1))

    expect(endTodolist.length).toBe(1)
    expect(endTodolist[0].id).toBe(todolistID2)


})

test("change filter todolist", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startTodolists: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
    ]

    let endTodolist = todolistReducer(startTodolists, ChangeFilterTodolistAC(todolistID1, "active"))

    expect(endTodolist.length).toBe(2)
    expect(endTodolist[0].filter).toBe("active")


})

test("add todolist", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let todolistID3 = v1();

    const startTodolists: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
    ]

    let endTodolists = todolistReducer(startTodolists, AddTodolistAC(todolistID3,"What to wear"))

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].title).toBe("What to wear")
    expect(endTodolists[0].id).toBe(todolistID3)


})

test("correct title from todolist should be changed", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startTodolists: Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'active'},
    ]

    let endTodolists = todolistReducer(startTodolists, ChangeTodolistTitleAC(todolistID1,"Changed title"))

    expect(endTodolists.length).toBe(2)
    expect(endTodolists[0].title).toBe("Changed title")

})