import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { TaskStatuses, TaskType } from "api/types"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { EditableSpan } from "components/editableSpan/EditableSpan"
import { FilterValueType, tasksThunks, TodolistDomainType, todolistsActions } from "features/todolistsList"
import { ButtonMemo } from "features/todolistsList/todolist/ButtonMemo"
import { useActions } from "hooks/useActions"
import React, { FC, memo, useCallback, useEffect, useMemo } from "react"
import { Task } from "./task/Task"

type TodoListPropsType = {
  todolist: TodolistDomainType
  tasks: TaskType[]
  demo?: boolean
}

export const TodoList: FC<TodoListPropsType> = memo(({ demo, tasks, todolist }) => {
  const { changeTodolistFilter, removeTodolist, changeTodolistTitle } = useActions(todolistsActions)
  const { addTask, fetchTasks } = useActions(tasksThunks)

  useEffect(() => {
    if (!demo) {
      fetchTasks(todolist.id)
    }
  }, [])

  tasks = useMemo(() => {
    if (todolist.filter === "active") tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (todolist.filter === "completed") tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

    return tasks
  }, [todolist.filter, tasks])

  const changeFilterHandler = useCallback((filter: FilterValueType) => {
    changeTodolistFilter({ todolistId: todolist.id, filter })
  }, [todolist.id])

  const removeTodolistItemHandler = useCallback(() => {
    removeTodolist(todolist.id)
  }, [todolist.id])

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      changeTodolistTitle({ todolistId: todolist.id, title })
    }, [todolist.id])

  const addTaskHandler = useCallback(
    (title: string) => {
      addTask({ todolistId: todolist.id, title })
    }, [todolist.id])

  return <div className='container'>
    <h3>
      <EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler} />
      <IconButton className={'btn_todolist'} onClick={removeTodolistItemHandler} disabled={todolist.entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </h3>
    <AddItemForm disabled={todolist.entityStatus == "loading"} addItem={addTaskHandler} />
    {tasks.length
      ? <>
        {tasks.map(task => <Task key={task.id} task={task} todolistId={todolist.id} />)}
      </>
      : <span className='list_empty'>Your list is empty</span>}
    <div className='div-filter'>
      <ButtonMemo
        title='All'
        color='success'
        selectedFilter={todolist.filter}
        buttonFilter={"all"}
        onClick={changeFilterHandler} />
      <ButtonMemo
        title='Active'
        color='error'
        selectedFilter={todolist.filter}
        buttonFilter={"active"}
        onClick={changeFilterHandler} />
      <ButtonMemo
        title='Completed'
        color='secondary'
        selectedFilter={todolist.filter}
        buttonFilter={"completed"}
        onClick={changeFilterHandler} />
    </div>
  </div>
})

