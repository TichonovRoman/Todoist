import React, {useCallback} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {FilterValuesType} from '../todolists-reducer'
import IconButton from '@mui/material/IconButton';
import {Delete} from '@mui/icons-material';
import {RequestStatusType} from "../../../app/app-reducer";
import SortButtonGroup from "./SortButtonGroup/SortButtonGroup";

type PropsType = {
    id: string
    title: string
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {

    const {
        id,
        addTask,
        removeTodolist,
        changeFilter,
        changeTodolistTitle,
        changeTaskTitle,
        changeTaskStatus,
        tasks,
        filter,
        title,
        entityStatus,
        removeTask
    } = props

    const addTaskHandler = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(id, title)
    }, [id, changeTodolistTitle])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"}/>
        <div>
            {
                tasksForTodolist.map(task => <Task key={task.id}
                                                   task={task}
                                                   todolistId={id}
                                                   removeTask={removeTask}
                                                   changeTaskTitle={changeTaskTitle}
                                                   changeTaskStatus={changeTaskStatus}
                />)
            }
        </div>
        <SortButtonGroup filter={filter}
                         id={id}
                         changeFilter={changeFilter}
        />
    </div>
})


