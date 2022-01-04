import React from 'react';


type TodoListHeaderPropsType = {
    title: string
}

const TodoListHeader: React.FC<TodoListHeaderPropsType> = ({title}) => {
    return <h3>{title}</h3>;
};

export default TodoListHeader;