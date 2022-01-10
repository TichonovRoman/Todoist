import React from 'react';


type TaskPropsType = {
    id: number
    isDone: boolean
    title: string
    removeTask: (taskId: number) => void
}



const Task: React.FC<TaskPropsType> = (props) => {
    return (
        <div>
            <li>
                <input type="checkbox" checked={props.isDone}/> <span>{props.title}</span>
                <button onClick={() => {props.removeTask(props.id)}}>X</button>
            </li>
        </div>
    );
};

export default Task;