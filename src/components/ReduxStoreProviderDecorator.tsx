import React from 'react';
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/Todolist/reducers/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/Todolist/reducers/todolists-reducer";
import {appReducer} from "../app/reducer/app-reducer";
import {AppRootStateType} from "../app/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";
import thunkMiddleware from "redux-thunk";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', addedDate: '', order: 0, priority: TaskPriorities.Low, deadline: ''
            },
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', addedDate: '', order: 0, priority: TaskPriorities.Low, deadline: ''
            },
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', addedDate: '', order: 0, priority: TaskPriorities.Low, deadline: ''
            }
        ]
    },
    app: {status: 'idle', error: null, isInitialized: false},
    auth: {isLoggedIn: false}
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    );
};

export default ReduxStoreProviderDecorator;