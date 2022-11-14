import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";

type TodoListPropsType = {
    todolistId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValueType
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    cnangeFilter: (todolistId: string, filter: FilterValueType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolistItem: (todolistId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksList = props.tasks.length
        ?
        <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(props.todolistId, task.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)

                    return (
                        <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                            <input
                                onChange={changeTaskStatus}
                                type="checkbox"
                                checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        : <span>Your list is empty</span>


    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        return () => props.cnangeFilter(props.todolistId, filter)
    }
    const removeTodolistItemHandler = () => {
        props.removeTodolistItem(props.todolistId)
    }

    const addTask = (title: string) => {
        props.addTask( props.todolistId, title)
    }

    return (
        <div className={'container'}>
            <h3>
                {props.title}
                <button onClick={removeTodolistItemHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksList}
            <div className={'div-filter'}>
                <button className={props.filter === 'all' ? 'btn-active' : ''}
                        onClick={changeFilterHandlerCreator('all')}
                > All
                </button>
                <button className={props.filter === 'active' ? 'btn-active' : ''}
                        onClick={changeFilterHandlerCreator('active')}
                >Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={changeFilterHandlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;