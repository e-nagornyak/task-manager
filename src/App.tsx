import React, {useCallback, useEffect} from 'react';
import {TodoList} from "./components/Todolist/TodoList";
import './css/App.css';
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, removeTaskTC,
    removeTaskAC, TaskStateType, addTaskTC,
} from "./redux/reducers/tasks-reducer";
import {
    addTodolistAC, createTodolistTC,
    changeTaskFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValueType,
    removeTodolistAC, removeTodolistTC, TodolistDomainType, changeTodolistTitleTC,
} from "./redux/reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {TaskStatuses, todolistsApi} from "./api/todolists-api";


function App() {
    const dispatch = useAppDispatch()
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    let tasks = useAppSelector<TaskStateType>(state => state.tasks)

    // TASK
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const cnangeTaskFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(changeTaskFilterAC(todolistId, filter))
    }, [dispatch])

    // TODOLIST
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    // MAP
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
        :
        <span className={'warning'}>Your list is empty</span>

    //GUI (graphical user interface):
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistItem}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
