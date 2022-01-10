import React from 'react';
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

const Todolist = (props: TodolistPropsType) => {

    let tasksComponents = props.tasks.map(t => <Task key={t.id} {...t} removeTask = {props.removeTask}/>)


    return (
        <div>
            <div>
                <TodoListHeader title={props.title}/>
                {/*<h3>What to learn</h3>*/}
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksComponents}
                </ul>
                <div>
                    <Button title={"All"} changeFilter={() => {props.changeFilter("all")}}/>
                    <Button title={"Active"} changeFilter={() => {props.changeFilter("active")}}/>
                    <Button title={"Completed"} changeFilter={() => {props.changeFilter("completed")}}/>
                </div>
            </div>
        </div>
    );
};

export default Todolist;