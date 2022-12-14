import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';

type TodoListPropsType = {
    todolistId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValueType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    cnangeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolistItem: (todolistId: string) => void
    changeTodolistTile: (todolistId: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.length
        ?
        <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(props.todolistId, task.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)

                    const changeTitleStatus = (newValue: string) => props.changeTaskTitle(props.todolistId, task.id, newValue)


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
        : <span className={'list_empty'}>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => props.cnangeFilter(props.todolistId, filter)
    }
    const removeTodolistItemHandler = () => props.removeTodolistItem(props.todolistId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTile(props.todolistId, title)
    const addTask = (title: string) => props.addTask(props.todolistId, title)


    return (
        <div className={'container'}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolistItemHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksList}
            <div className={'div-filter'}>
                <Button size={'small'} variant={props.filter === 'all' ? 'outlined' : 'contained'} color={'success'}
                        onClick={changeFilterHandlerCreator('all')}>All</Button>
                <Button size={'small'} variant={props.filter === 'active' ? 'outlined' : 'contained'} color={'error'}
                        onClick={changeFilterHandlerCreator('active')}>Active</Button>
                <Button size={'small'} variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        color={'secondary'} onClick={changeFilterHandlerCreator('completed')}>Completed</Button>


                {/*<button className={props.filter === 'all' ? 'btn-active' : ''} onClick={changeFilterHandlerCreator('all')}                > All                </button>*/}
                {/*<button className={props.filter === 'active' ? 'btn-active' : ''}*/}
                {/*        onClick={changeFilterHandlerCreator('active')}*/}
                {/*>Active*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'completed' ? 'btn-active' : ''}*/}
                {/*        onClick={changeFilterHandlerCreator('completed')}*/}
                {/*>Completed*/}
                {/*</button>*/}
            </div>
        </div>
    );
};

export default TodoList;