import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

    const todoListTitle: string = "What to learn"

    // let tasks: Array<TaskType> = [
    //      {id: 1, title: "HTML&CSS", isDone: true},
    //      {id: 2, title: "JS/ES6", isDone: true},
    //      {id: 3, title: "REACT", isDone: true},
    //   ];

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS/ES6", isDone: true},
            {id: 3, title: "REACT", isDone: false},
        ]
    )
    const removeTask = (taskId: number) => {

        const filteredTasks = tasks.filter(t => t.id !== taskId) // true (t которые вернут тру попадут в массив) | false (t которые вернут фолм не попадут в массив)
        setTasks(filteredTasks)

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
            />
        </div>
    );
}

export default App;
