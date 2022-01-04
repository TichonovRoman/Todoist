import React from 'react';


type TaskPropsType = {
    id: number
    isDone: boolean
    title: string
}



const Task: React.FC<TaskPropsType> = ({
    id: number,
    isDone,
    title
    }) => {
    return (
        <div>
            <li>
                <input type="checkbox" checked={isDone}/> <span>{title}</span>
            </li>
        </div>
    );
};

export default Task;