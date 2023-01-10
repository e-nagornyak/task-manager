import React, {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import {TaskWithRedux} from "./TaskWithRedux";
import {FilterValueType} from "./redux/reducers/todolistsReducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TodoListPropsType = {
    todolistId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValueType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    cnangeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolistItem: (todolistId: string) => void
    changeTodolistTile: (todolistId: string, title: string) => void
}

export const TodoList = memo((props: TodoListPropsType) => {
    let tasks = props.tasks

    tasks = useMemo(() => {
        if (props.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
        if (props.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

        return tasks
    }, [props.filter, tasks])

    const tasksList = props.tasks.length
        ?
        <ul>
            {
                tasks.map((task) => {
                    return <TaskWithRedux
                        key={task.id}
                        task={task}
                        todolistId={props.todolistId}
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
                <ButtonMemo title={'All'} size={'small'} color={'success'}
                            variant={props.filter === 'all' ? 'outlined' : 'contained'}
                            onClick={changeFilterHandlerCreator("all")}/>
                <ButtonMemo title={'Active'} size={'small'} color={'error'}
                            variant={props.filter === 'active' ? 'outlined' : 'contained'}
                            onClick={changeFilterHandlerCreator("active")}/>
                <ButtonMemo title={'Completed'} size={'small'} color={'secondary'}
                            variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                            onClick={changeFilterHandlerCreator("completed")}/>
            </div>
        </div>
    );
});

type ButtonMemoPropsType = {
    title: string
    size?: 'small' | 'medium' | 'large'
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
    onClick: () => void
}

const ButtonMemo = memo((props: ButtonMemoPropsType) => {
    return (
        <Button
            size={props.size}
            variant={props.variant}
            color={props.color}
            onClick={props.onClick}
        > {props.title}
        </Button>
    )
})