import React, {ChangeEvent, useState} from 'react';
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>('')

    let tasksComponents = props.tasks.map(t => <Task key={t.id} {...t} removeTask={props.removeTask}/>)

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyPressAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTask()
    }

    const setAllFilter = () => props.changeFilter("all")
    const setActiveFilter = () => props.changeFilter("active")
    const setCompletedFilter = () => props.changeFilter("completed")
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        <div>
            <div>
                <TodoListHeader title={props.title}/>
                <div>
                    <input
                        value={title}
                        onChange={onChangeSetTitle}
                        onKeyPress={onKeyPressAddTask}
                    />
                    <button onClick={onClickAddTask}>+</button>
                </div>
                <ul>
                    {tasksComponents}
                </ul>
                <div>
                    <Button title={"All"} changeFilter={setAllFilter}/>
                    <Button title={"Active"} changeFilter={setActiveFilter}/>
                    <Button title={"Completed"} changeFilter={setCompletedFilter}/>
                </div>
            </div>
        </div>
    );
};

export default Todolist;

// 1. Функция принимает массив чисел и возвращает максимальное значение
// 2. Функция принимает массив чисел и возвращает массив с двумя максимальными значениями
// 2. Функция принимает массив чисел и количество максимумов, которые надо найти и возвращает массив
// с максимальными значениями
// Выполнить до понедельника до туду листа. Без использования втроенным методов (Матхмакс и sort и пр.)ю Валидировать результат