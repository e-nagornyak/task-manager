import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TaskStatuses } from "api/types"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { selectIsLoggedIn } from "features/auth"
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC
} from "features/todolistsList/todolist/reducer/thunks"
import { TaskStateType } from "features/todolistsList/todolist/task/reducer/tasks-reducer"
import { addTaskTC, removeTaskTC, updateTaskTC } from "features/todolistsList/todolist/task/reducer/thunks"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import React, { FC, useCallback, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { changeTaskFilter, FilterValueType, TodolistDomainType } from "./todolist/reducer/todolists-reducer"
import { TodoList } from "./todolist/TodoList"

type TodolistsListPropsType = {
  demo?: boolean
}

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn)
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TaskStateType>(state => state.tasks)
  useEffect(() => {
    if (!demo || isLoggedIn) {
      dispatch(fetchTodolistsTC())
    }
  }, [])

  // Fnc for todolist
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title))
    }, [dispatch]
  )

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    }, [dispatch]
  )

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC({ todolistId, title }))
    }, [dispatch]
  )

  // Fnc for task
  const removeTaskHandler = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC({ todolistId, taskId }))
    }, [dispatch])

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(addTaskTC({ todolistId, title }))
    }, [dispatch])

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC({ todolistId, taskId, model: { status } }))
    }, [dispatch]
  )

  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, newTitle: string) => {
      dispatch(updateTaskTC({ todolistId, taskId, model: { title: newTitle } }))
    }, [dispatch]
  )

  const cnangeTaskFilter = useCallback(
    (todolistId: string, filter: FilterValueType) => {
      dispatch(changeTaskFilter({ todolistId, filter }))
    }, [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  const todolistItem = todolists.length ?
    todolists.map(tl => (
      <Grid key={tl.id} item>
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
    ))
    : <span className='warning'>Your list is empty</span>
  return <div>
    <Grid  container>
      <AddItemForm addItem={addTodolist} />
    </Grid>
    <Grid container spacing={3}>
      {todolistItem}
    </Grid>
  </div>
}
