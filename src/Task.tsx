import React from 'react';


type TaskPropsType = {
    id: string
    isDone: boolean
    title: string
    removeTask: (taskId: string) => void
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