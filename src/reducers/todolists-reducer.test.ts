import {v1} from "uuid";
import {useState} from "react";
import {TodolistsType} from "../AppWithRedux";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolists-reducer";

let todolistID1: string
let todolistID2: string

let startTodolists: Array<TodolistsType>

beforeEach(()=>{
    todolistID1 = v1();
    todolistID2 = v1();

    startTodolists = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
})


test("correct todolist should be removed", () => {

    let endTodolist = todolistReducer(startTodolists, RemoveTodolistAC(todolistID1))

    expect(endTodolist.length).toBe(1)
    expect(endTodolist[0].id).toBe(todolistID2)


})

test("change filter todolist", () => {

    let endTodolist = todolistReducer(startTodolists, ChangeFilterTodolistAC(todolistID1, "active"))

    expect(endTodolist.length).toBe(2)
    expect(endTodolist[0].filter).toBe("active")


})

test("add todolist", () => {

    let endTodolists = todolistReducer(startTodolists, AddTodolistAC("What to wear"))

    expect(endTodolists.length).toBe(3)
    expect(endTodolists[0].title).toBe("What to wear")



})

test("correct title from todolist should be changed", () => {

    let endTodolists = todolistReducer(startTodolists, ChangeTodolistTitleAC(todolistID1,"Changed title"))

    expect(endTodolists.length).toBe(2)
    expect(endTodolists[0].title).toBe("Changed title")

})