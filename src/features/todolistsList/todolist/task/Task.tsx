import BackspaceIcon from "@mui/icons-material/Backspace"
import { Checkbox, IconButton } from "@mui/material"
import { TaskStatuses, TaskType } from "api/types"
import { EditableSpan } from "components/editableSpan/EditableSpan"
import React, { ChangeEvent, memo } from "react"

type TaskPropsType = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  removeTask: (param: { todolistId: string, taskId: string }) => void
}

export const Task = memo((props: TaskPropsType) => {
  const removeTaskHandler = () => {
    props.removeTask({ todolistId: props.todolistId, taskId: props.task.id })
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
  }
  const changeTitleStatusHandler = (newValue: string) => {
    props.changeTaskTitle(props.todolistId, props.task.id, newValue)
  }

  return (
    <div className={props.task.status === TaskStatuses.Completed ? 'isDone' : undefined}>
      <Checkbox onChange={changeTaskStatusHandler} checked={props.task.status === TaskStatuses.Completed} />
      <EditableSpan title={props.task.title} onChange={changeTitleStatusHandler} />
      <IconButton onClick={removeTaskHandler} aria-label="delete">
        <BackspaceIcon color="action" />
      </IconButton>
    </div>
  )
})
