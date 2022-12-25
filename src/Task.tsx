import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "./App";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from "@mui/icons-material/Backspace";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    const removeTask = () => props.removeTask(props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    const changeTitleStatus = (newValue: string) => props.changeTaskTitle(props.task.id, newValue)

    return (
        <div className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={changeTitleStatus}/>
            <IconButton onClick={removeTask} aria-label="delete">
                <BackspaceIcon color={'action'}/>
            </IconButton>
        </div>
    );
})

