import BackspaceIcon from "@mui/icons-material/Backspace"
import { Checkbox, IconButton } from "@mui/material"
import { TaskStatuses, TaskType } from "api/types"
import { EditableSpan } from "components/editableSpan/EditableSpan"
import { tasksThunks } from "features/todolistsList"
import { useActions } from "hooks/useActions"
import React, { ChangeEvent, FC, memo, useCallback } from "react"

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({ task, todolistId }) => {
  const { updateTask, removeTask } = useActions(tasksThunks)

  const removeTaskHandler = useCallback(() => {
    removeTask({ todolistId: todolistId, taskId: task.id })
  }, [])

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      todolistId,
      taskId: task.id,
      model: { status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New }
    })
  }, [])

  const changeTitleStatusHandler = (title: string) => {
    updateTask({ todolistId, taskId: task.id, model: { title } })
  }

  return (
    <div className={task.status === TaskStatuses.Completed ? "isDone" : ""}>
      <Checkbox color={"secondary"} onChange={changeTaskStatusHandler} checked={task.status === TaskStatuses.Completed} />
      <EditableSpan title={task.title} onChange={changeTitleStatusHandler} />
      <IconButton onClick={removeTaskHandler} aria-label='delete'>
        <BackspaceIcon color='action' />
      </IconButton>
    </div>
  )
})
