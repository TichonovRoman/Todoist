import React from 'react';
import TodoListHeader from "./TodoListHeader";
import Button from "./Button";
import {TaskType} from "./App";
import Task from "./Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

const Todolist = (props: TodolistPropsType) => {
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
                    <Task key={props.tasks[0].id} {...props.tasks[0]}/>
                    {/*//деструктуризация и в итоге этот
                    компонет разюивается на отдельны*/}
                    {/*элементы, которые ждет type*/}
                    <Task key={props.tasks[1].id} {...props.tasks[1]}/>
                    <Task key={props.tasks[2].id} {...props.tasks[2]}/>

                </ul>
                <div>
                    <Button title={"All"}/>
                    <Button title={"Active"}/>
                    <Button title={"Completed"}/>
                    {/*<button>All</button>*/}
                    {/*<button>Active</button>*/}
                    {/*<button>Completed</button>*/}
                </div>
            </div>
        </div>
    );
};

export default Todolist;