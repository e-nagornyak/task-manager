import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TaskStatuses } from "api/types"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { selectIsLoggedIn } from "features/auth"
import { FilterValueType, tasksThunks, TodolistDomainType, todolistsActions } from "features/todolistsList"
import { TaskStateType } from "features/todolistsList/todolist/task/reducer/types"
import { useActions, useAppSelector } from "hooks"
import React, { FC, useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { TodoList } from "./todolist/TodoList"

type TodolistsListPropsType = {
  demo?: boolean
}

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TaskStateType>(state => state.tasks)

  const { addTaskTC, updateTaskTC, removeTaskTC } = useActions(tasksThunks)
  const {
    addTodolistTC,
    changeTaskFilter,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
  } = useActions(todolistsActions)

  // Fnc for todolist
  const addTodolist = useCallback((title: string) => {
    addTodolistTC(title)
  }, [])

  const removeTodolist = useCallback(
    (todolistId: string) => {
      removeTodolistTC(todolistId)
    }, [])

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      changeTodolistTitleTC({ todolistId, title })
    }, [])

  // Fnc for task
  const removeTaskHandler = useCallback(
    (todolistId: string, taskId: string) => {
      removeTaskTC({ todolistId, taskId })
    }, [])

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      addTaskTC({ todolistId, title })
    }, [])

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      updateTaskTC({ todolistId, taskId, model: { status } })
    }, [])

  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, newTitle: string) => {
      updateTaskTC({ todolistId, taskId, model: { title: newTitle } })
    }, [])

  const cnangeTaskFilter = useCallback(
    (todolistId: string, filter: FilterValueType) => {
      changeTaskFilter({ todolistId, filter })
    }, [])

  useEffect(() => {
    if (!demo || isLoggedIn) {
      fetchTodolistsTC()
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  const todolistItem = todolists.length
    ? todolists.map(tl => <Grid key={tl.id} item>
        <Paper style={{ padding: "10px" }}>
          <TodoList
            key={tl.id}
            demo={demo}
            todolist={tl}
            tasks={tasks[tl.id]}
            addTask={addTask}
            removeTask={removeTaskHandler}
            cnangeFilter={cnangeTaskFilter}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTodolistItem={removeTodolist}
            changeTodolistTile={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    ) : <span className='warning'>Your list is empty</span>
  return <div>
    <Grid container>
      <AddItemForm addItem={addTodolist} />
    </Grid>
    <Grid container spacing={3}>
      {todolistItem}
    </Grid>
  </div>
}
