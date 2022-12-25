import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./App";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {useDispatch} from "react-redux";
import {changeTaskStatusAc, changeTaskTitleAC, removeTaskAC} from "./reducers/tasksReducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(todolistId, task.id))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAc(todolistId, task.id, e.currentTarget.checked))
    const changeTitleStatus = (newValue: string) => dispatch(changeTaskTitleAC(todolistId, task.id, newValue))

    return (
        <div className={task.isDone ? 'isDone' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={task.isDone}/>
            <EditableSpan title={task.title} onChange={changeTitleStatus}/>
            <IconButton onClick={removeTask} aria-label="delete">
                <BackspaceIcon color={'action'}/>
            </IconButton>
        </div>
    );
})

