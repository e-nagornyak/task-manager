import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { AddItemForm } from "components/addItemForm/AddItemForm"
import { selectIsLoggedIn } from "features/auth"
import { TodolistDomainType, todolistsActions } from "features/todolistsList"
import { TaskStateType } from "features/todolistsList/todolist/task/reducer/types"
import { useActions, useAppSelector } from "hooks"
import React, { FC, useEffect } from "react"
import { Navigate } from "react-router-dom"
import { TodoList } from "./todolist/TodoList"

type TodolistsListPropsType = {
  demo?: boolean
}

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
  const tasks = useAppSelector<TaskStateType>(state => state.tasks)

  const { addTodolist, fetchTodolists } = useActions(todolistsActions)

  useEffect(() => {
    if (!demo || isLoggedIn) {
      fetchTodolists()
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  }

  return <div>
    <Grid container>
      <AddItemForm addItem={addTodolist} />
    </Grid>
    <Grid container spacing={3}>
      {todolists.length
        ? todolists.map(tl => <Grid key={tl.id} item>
            <Paper style={{ padding: "10px" }}>
              <TodoList
                key={tl.id}
                demo={demo}
                todolist={tl}
                tasks={tasks[tl.id]} />
            </Paper>
          </Grid>
        ) : <span className='warning'>Your list is empty</span>}
    </Grid>
  </div>
}