import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType, TodolistsType} from "./App";
import {AppRootStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {addTaskAC, changeTaskStatusAc, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";
import {changeTaskFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolistsReducer";

type TodolistWithReduxPropsType = {
    todolist: TodolistsType
}
export const TodolistWithRedux = (props: TodolistWithReduxPropsType) => {
    const dispatch = useDispatch()
    const {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }


    const tasksList = tasks.length
        ?
        <ul>
            {
                tasks.map((task) => {
                    const removeTask = () => dispatch(removeTaskAC(id, task.id))
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAc(id, task.id, e.currentTarget.checked))
                    const changeTitleStatus = (newValue: string) => dispatch(changeTaskTitleAC(id, task.id, newValue))


                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={changeTitleStatus}/>
                            <IconButton onClick={removeTask} aria-label="delete">
                                <BackspaceIcon color={'action'}/>
                            </IconButton>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => dispatch(changeTaskFilterAC(id, filter))
    }
    const removeTodolistItemHandler = () => dispatch(removeTodolistAC(id))
    const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC(id, title))
    const addTask = (title: string) => dispatch(addTaskAC(id, title))

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistItemHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksList}
            <div className={'div-filter'}>
                <Button size={'small'} variant={filter === 'all' ? 'outlined' : 'contained'} color={'success'}
                        onClick={changeFilterHandlerCreator('all')}>All</Button>
                <Button size={'small'} variant={filter === 'active' ? 'outlined' : 'contained'} color={'error'}
                        onClick={changeFilterHandlerCreator('active')}>Active</Button>
                <Button size={'small'} variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'} onClick={changeFilterHandlerCreator('completed')}>Completed</Button>
            </div>
        </div>
    );
};


