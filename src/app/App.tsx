import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { selectIsInitialized, selectStatus } from "app"
import { ErrorSnackbars } from "components/errorSnackbar/ErrorSnackbar"
import { Auth } from "features/auth/Auth"
import { TodolistsList } from "features/todolistsList/TodolistsList"
import { useAppDispatch, useAppSelector } from "hooks/hooks"
import React, { FC, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ButtonAppBar from "../features/buttonAppBar/ButtonAppBar"
import "./App.css"
import { initializeAppTC } from "./reducer/thunk"

type AppPropsType = {
  demo?: boolean
}

export const App: FC<AppPropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ width: "100%", position: "fixed", top: "30%", textAlign: "center" }}>
        <CircularProgress size={80} />
      </div>
    )
  }

  return (
    <div className='App'>
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color='info' />}
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
