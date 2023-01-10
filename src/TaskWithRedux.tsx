import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/reducers/tasksReducer";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTask = () => dispatch(removeTaskAC(todolistId, task.id))
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(todolistId, task.id, (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)))
    const changeTitleStatus = (newValue: string) => dispatch(changeTaskTitleAC(todolistId, task.id, newValue))

    return (
        <div className={task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox onChange={changeTaskStatus} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan title={task.title} onChange={changeTitleStatus}/>
            <IconButton onClick={removeTask} aria-label="delete">
                <BackspaceIcon color={'action'}/>
            </IconButton>
        </div>
    );
})

