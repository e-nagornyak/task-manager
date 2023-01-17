import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import {FilterValueType, TodolistDomainType} from "./reducers/todolists-reducer";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {useAppDispatch} from "../../../hooks/hooks";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {Task} from "./Task/Task";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    cnangeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTodolistItem: (todolistId: string) => void
    changeTodolistTile: (todolistId: string, title: string) => void
    demo?: boolean
}

export const TodoList: React.FC<TodoListPropsType> = memo(({demo = false, ...props}) => {
    let tasks = props.tasks

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasksTC(props.todolist.id))
        }
    }, [])

    tasks = useMemo(() => {
        if (props.todolist.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
        if (props.todolist.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

        return tasks
    }, [props.todolist.filter, tasks])

    const tasksList = props.tasks.length
        ?
        <>
            {
                tasks.map((task) => {
                    return <Task
                        key={task.id}
                        task={task}
                        todolistId={props.todolist.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />
                    // <TaskWithRedux
                    //     key={task.id}
                    //     task={task}
                    //     todolistId={props.todolistId}
                    // />
                })
            }
        </>
        : <span className={'list_empty'}>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => props.cnangeFilter(props.todolist.id, filter)
    }
    const removeTodolistItemHandler = () => {
        props.removeTodolistItem(props.todolist.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTile(props.todolist.id, title)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistItemHandler} disabled={props.todolist.entityStatus == 'loading'} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm disabled={props.todolist.entityStatus == 'loading'} addItem={addTask}/>
            {tasksList}
            <div className={'div-filter'}>
                <ButtonMemo title={'All'} size={'small'} color={'success'}
                            variant={props.todolist.filter === 'all' ? 'outlined' : 'contained'}
                            onClick={changeFilterHandlerCreator("all")}/>
                <ButtonMemo title={'Active'} size={'small'} color={'error'}
                            variant={props.todolist.filter === 'active' ? 'outlined' : 'contained'}
                            onClick={changeFilterHandlerCreator("active")}/>
                <ButtonMemo title={'Completed'} size={'small'} color={'secondary'}
                            variant={props.todolist.filter === 'completed' ? 'outlined' : 'contained'}
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