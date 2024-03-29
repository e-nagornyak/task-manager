import { createAsyncThunk } from "@reduxjs/toolkit"
import { todolistsAPI } from "api/todolistsAPI"
import { setAppStatus } from "app/reducer/app-reducer"
import { AxiosError } from "axios"
import { setTodolistStatus } from "features/todolistsList/todolist/reducer/todolists-reducer"
import { handleServerNetworkError } from "utils/error-utils"

export const fetchTodolists = createAsyncThunk("todolist/fetchTodolists",
  async (param, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsAPI.getTodolists()
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const removeTodolist = createAsyncThunk("todolist/removeTodolist",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(setTodolistStatus({ todolistId, status: "loading" }))
    try {
      await todolistsAPI.deleteTodolist(todolistId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolistId }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const addTodolist = createAsyncThunk("todolist/addTodolist",
  async (title: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsAPI.addTodolist(title)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolist: res.data.data.item }
      } else {
        handleServerNetworkError({ message: res.data.messages[0] }, dispatch)
        return rejectWithValue(null)
      }

    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const changeTodolistTitle = createAsyncThunk("todolist/changeTodolistTitle",
  async (param: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
    const { todolistId, title } = param
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(setTodolistStatus({ todolistId, status: "loading" }))
    try {
      await todolistsAPI.updateTodolist(todolistId, title)
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolistStatus({ todolistId, status: "succeeded" }))
      return { todolistId, title }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })
