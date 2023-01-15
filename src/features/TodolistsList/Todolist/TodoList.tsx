import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import {FilterValueType} from "./reducers/todolists-reducer";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {useAppDispatch} from "../../../hooks/hooks";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {Task} from "./Task/Task";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

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

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])

    tasks = useMemo(() => {
        if (props.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
        if (props.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

        return tasks
    }, [props.filter, tasks])

    const tasksList = props.tasks.length
        ?
        <>
            {
                tasks.map((task) => {
                    return <Task
                        key={task.id}
                        task={task}
                        todolistId={props.todolistId}
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
        return () => props.cnangeFilter(props.todolistId, filter)
    }
    const removeTodolistItemHandler = () => {
        props.removeTodolistItem(props.todolistId)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTile(props.todolistId, title)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<Button onClick={removeTodolistItemHandler} variant="text" size={'small'} startIcon={<DeleteIcon/>}/>*/}
                <IconButton onClick={removeTodolistItemHandler} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
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