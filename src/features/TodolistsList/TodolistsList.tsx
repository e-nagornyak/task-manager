import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {
    changeTaskFilterAC,
    changeTodolistTitleTC,
    createTodolistTC, fetchTodolistsTC, FilterValueType,
    removeTodolistTC,
    TodolistDomainType
} from "./Todolist/reducers/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./Todolist/reducers/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "./Todolist/TodoList";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";

export const TodolistsList: React.FC = () => {

    const dispatch = useAppDispatch()
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    let tasks = useAppSelector<TaskStateType>(state => state.tasks)

    // Fnc for todolist
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    // Fnc for task
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: newTitle}))
    }, [dispatch])
    const cnangeTaskFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeTaskFilterAC(todolistId, filter))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    // Mapping
    const todolistItem = todolists.length
        ? todolists.map(tl => {
            return (
                <Grid key={tl.id} item>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={tl.id}
                            todolistId={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            cnangeFilter={cnangeTaskFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTodolistItem={removeTodolist}
                            changeTodolistTile={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <span className={'warning'}>Your list is empty</span>

    return (
        <div>
            <Grid container>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolistItem}
            </Grid>
        </div>
    )
}