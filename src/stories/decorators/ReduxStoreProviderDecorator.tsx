import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../reducers/tasks-reducer";
import {v1} from "uuid";
import {TasksStateType, TodolistsType} from "../../AppWithRedux";
import {todolistReducer} from "../../reducers/todolists-reducer";
import {store} from "../../state/state";


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
};

export default ReduxStoreProviderDecorator;