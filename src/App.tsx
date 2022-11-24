import React, {useReducer} from 'react';
import {v1} from "uuid";
import TodoList from "./TodoList";
import './css/App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import {addTaskAC,addTaskForNewTodolistAC,changeTaskStatusAc,changeTaskTitleAC,removeTaskAC,tasksReducer} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeTaskFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer";

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
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolists[0].id]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolists[1].id]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })
    // Task reducers
    const removeTask = (todolistId: string, taskId: string) => dispatchTasks(removeTaskAC(todolistId, taskId))
    const addTask = (todolistId: string, title: string) => dispatchTasks(addTaskAC(todolistId, title))
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => dispatchTasks(changeTaskStatusAc(todolistId, taskId, isDone))
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    const cnangeTaskFilter = (todolistId: string, filter: FilterValueType) => dispatchTodolists(changeTaskFilterAC(todolistId, filter))

    // Todolist reducers
    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        dispatchTodolists(addTodolistAC(newTodolist))
        dispatchTasks(addTaskForNewTodolistAC(newTodolist.id))
    }
    const removeTodolistItem = (todolistId: string) => dispatchTodolists(removeTodolistAC(todolistId))
    const changeTodolistTitle = (todolistId: string, title: string) => dispatchTodolists(changeTodolistTitleAC(todolistId, title))

    const todolistItem = todolists.length
        ?
        todolists.map(el => {
            let filteredTasks = tasks[el.id]

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
                </Grid>
            </Container>
        </div>
    )
}

export default App;
