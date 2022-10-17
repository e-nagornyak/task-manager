import React from 'react';
import {TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksList = props.tasks.length
        ?
        <ul>
            {
                props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>


    return (
        <div className={'container'}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasksList}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;