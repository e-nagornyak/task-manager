import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { initializeAppTC, selectIsInitialized, selectStatus } from "app"
import { ErrorSnackbars } from "components/errorSnackbar/ErrorSnackbar"
import { Auth } from "features/auth"
import { TodolistsList } from "features/todolistsList/TodolistsList"
import { useAppDispatch, useAppSelector } from "hooks"
import React, { FC, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { ButtonAppBar } from "features/buttonAppBar/ButtonAppBar"
import "./App.css"

type PropsType = {
  demo?: boolean
}

export const App: FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    if (!demo) {
      dispatch(initializeAppTC())
    }
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ width: "100%", position: "fixed", top: "30%", textAlign: "center" }}>
        <CircularProgress size={80} color={'secondary'} />
      </div>
    )
  }

  return (
    <div className='App'>
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color='warning' />}
      <ErrorSnackbars />
      <Container fixed>
        <Routes>
          <Route path='/' element={<TodolistsList />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </Container>
    </div>
  )
}
