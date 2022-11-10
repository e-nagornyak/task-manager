import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

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
    // тимчасове сховище
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    //
    const tasksList = props.tasks.length
        ?
        <ul>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(props.todolistId, task.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId,task.id, e.currentTarget.checked)

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

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todolistId, trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const changeFilterHandlerCreator = (filter: FilterValueType) => {
        const handler = () => props.cnangeFilter(props.todolistId, filter)
        return handler
    }
    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    const removeTodolistItemHandler = () => {
        props.removeTodolistItem(props.todolistId)
    }

    return (
        <div className={'container'}>
            <h3>
                {props.title}
                <button onClick={removeTodolistItemHandler}>x</button>
            </h3>
            <div>
                <input
                    value={title} // контрольований input
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onKeyDownEnterAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={"errorTitle"}>Title is required</div>}
            </div>
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