import React, {memo, useCallback} from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import {Task} from "./Task";

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

const TodoList = memo((props: TodoListPropsType) => {
    console.log("Todolist rendering")

    let tasks = props.tasks
    if (props.filter === 'active') tasks = tasks.filter(t => !t.isDone)
    if (props.filter === 'completed') tasks = tasks.filter(t => t.isDone)

    const removeTask = useCallback((taskId: string) => props.removeTask(props.todolistId, taskId), [props.removeTask, props.todolistId])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => props.changeTaskStatus(props.todolistId, taskId, isDone), [props.changeTaskStatus, props.todolistId])
    const changeTitleStatus = useCallback((taskId: string, newTitle: string) => props.changeTaskTitle(props.todolistId, taskId, newTitle), [props.changeTaskTitle, props.todolistId])

    const tasksList = props.tasks.length
        ?
        <ul>
            {
                tasks.map((task) => {
                    return <Task
                        task={task}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTitleStatus}
                    />
                })
            }
        </ul>
        : <span className={'list_empty'}>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => props.cnangeFilter(props.todolistId, filter)
    }
    const removeTodolistItemHandler = () => props.removeTodolistItem(props.todolistId)
    const changeTodolistTitle = (title: string) => props.changeTodolistTile(props.todolistId, title)
    const addTask = useCallback((title: string) => props.addTask(props.todolistId, title), [props.addTask, props.todolistId])

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
            </div>
        </div>
    );
});

export default TodoList;