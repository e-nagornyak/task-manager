import React, {useState} from 'react';
import {v1} from "uuid";
import TodoList from "./TodoList";
import './css/App.css';

//CRUD
// Create
// Reade => part, pagination, filtration, sort
// Update
// Delete

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    // BLL (business logic layer):
    const todoListTitle: string = 'What to learn';

    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "React & TS", isDone: false},
            {id: v1(), title: "React & TS", isDone: false},
            {id: v1(), title: "React & TS", isDone: false},
        ]
    )

    const removeTask = (taskId: string) => {
        setTasksForTodoList(tasksForTodoList.filter(task => task.id !== taskId))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasksForTodoList([newTask, ...tasksForTodoList])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasksForTodoList(tasksForTodoList.map(t => t.id === taskId ? {...t, isDone: isDone}: t))
    }

    const [filter, setFilter] = useState<FilterValueType>('all')
    const cnangeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const getFilterTasks = (tasks: Array<TaskType>, filterValue: FilterValueType) => {
        let filteredTasks = tasks

        if (filterValue === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }

    //GUI (graphical user interface):
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={getFilterTasks(tasksForTodoList, filter)}
                filter={filter}
                addTask={addTask}
                removeTask={removeTask}
                cnangeFilter={cnangeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
