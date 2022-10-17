import React from 'react';
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    cnangeFilter: (filter: FilterValueType) => void
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
            <div className={'div-filter'}>
                <button onClick={() => props.cnangeFilter('all')}>All</button>
                <button onClick={() => props.cnangeFilter('active')}>Active</button>
                <button onClick={() => props.cnangeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;