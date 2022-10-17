import React, {useState} from 'react';
import TodoList from "./TodoList";
import './App.css';

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {
    // BLL (business logic layer):
    const todoListTitle: string = 'What to learn';

    const [tasksForTodoList, setTasksForTodoList] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML & CSS", isDone: true},
            {id: 2, title: "JS & ES6", isDone: true},
            {id: 3, title: "React & TS", isDone: false},
        ]
    )

    const removeTask = (taskId: number) =>{
        setTasksForTodoList(tasksForTodoList.filter (task => task.id !== taskId))
    }


    //GUI (graphical user interface):
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
