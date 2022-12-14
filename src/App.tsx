import React, {useReducer} from 'react';
import {v1} from "uuid";
import TodoList from "./TodoList";
import './css/App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {
    addTaskAC,
    addTaskForNewTodolistAC,
    changeTaskStatusAc,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeTaskFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer";
import {AppRootStateType} from "./redux/store";
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";

//CRUD
// Create
// Reade => part, pagination, filtration, sort
// Update
// Delete

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    // BLL (business logic layer):
    let todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()
    // Task reducers
    const removeTask = (todolistId: string, taskId: string) => dispatch(removeTaskAC(todolistId, taskId))
    const addTask = (todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title))
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => dispatch(changeTaskStatusAc(todolistId, taskId, isDone))
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    const cnangeTaskFilter = (todolistId: string, filter: FilterValueType) => dispatch(changeTaskFilterAC(todolistId, filter))

    // Todolist reducers
    const addTodolist = (title: string) => dispatch(addTodolistAC(title))
    const removeTodolistItem = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
        // delete tasks[todolistId]
    }
    const changeTodolistTitle = (todolistId: string, title: string) => dispatch(changeTodolistTitleAC(todolistId, title))
    const todolistItem = todolists.length
        ?
        todolists.map(el => {
            let filteredTasks = tasks[el.id]
            debugger

            if (el.filter === 'active') {
                filteredTasks = tasks[el.id].filter(t => !t.isDone)
            }
            if (el.filter === 'completed') {
                filteredTasks = tasks[el.id].filter(t => t.isDone)
            }

            return (
                <Grid item>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            tasks={filteredTasks}
                            filter={el.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            cnangeFilter={cnangeTaskFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            removeTodolistItem={removeTodolistItem}
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
                    {/*<TodolistWithRedux todolist={todolists}/>*/}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
