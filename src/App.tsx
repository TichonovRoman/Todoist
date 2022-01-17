import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

    const todoListTitle: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ]
    )
    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskId) // true (t которые вернут тру попадут в массив) | false (t которые вернут фолм не попадут в массив)
        setTasks(filteredTasks)

    }

    const addTask = (title: string) => {
        const newTask:TaskType = {id: v1(), title, isDone: false}  // title: title
        const updatedTasks: Array<TaskType> = [newTask, ...tasks]
        setTasks(updatedTasks)

    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // let tasksForRender = tasks
    // if(filter === "active"){
    //     tasksForRender = tasks.filter(t => t.isDone===false)
    // }
    // if (filter==="completed") {tasksForRender = tasks.filter(t => t.isDone===true)}

    const getTasksForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const tasksForRender = getTasksForRender()
    return (
        <div className="App">
            <Todolist title={todoListTitle}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
