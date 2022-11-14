import React, {useState} from 'react';
import {v1} from "uuid";
import TodoList from "./TodoList";
import './css/App.css';
import {AddItemForm} from "./AddItemForm";

//CRUD
// Create
// Reade => part, pagination, filtration, sort
// Update
// Delete

export type FilterValueType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    // BLL (business logic layer):
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)
        })
    }

    const cnangeFilter = (todolistId: string, filter: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el))
    }
    const removeTodolistItem = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
    }

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
                <TodoList
                    key={el.id}
                    todolistId={el.id}
                    title={el.title}
                    tasks={filteredTasks}
                    filter={el.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    cnangeFilter={cnangeFilter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodolistItem={removeTodolistItem}
                />
            )
        })
        :
        <span className={'warning'}>Your list is empty</span>


    //GUI (graphical user interface):
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistItem}
        </div>
    )
}

export default App;
