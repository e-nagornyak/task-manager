import { createAsyncThunk } from "@reduxjs/toolkit"
import { todolistsAPI } from "api/todolistsAPI"
import { UpdateTaskType } from "api/types"
import { setAppStatus } from "app/reducer/app-reducer"
import { AppRootStateType } from "app/store"
import { AxiosError } from "axios"
import { UpdateTaskModel } from "features/todolistsList/todolist/task/reducer/types"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"

export const fetchTasks = createAsyncThunk("tasks/fetchTasks",
  async (todolistId: string, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsAPI.getTasks(todolistId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolistId, tasks: res.data.items }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const removeTask = createAsyncThunk("tasks/removeTask",
  async (param: { todolistId: string, taskId: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    try {
      await todolistsAPI.removeTask(param.todolistId, param.taskId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolistId: param.todolistId, taskId: param.taskId }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const addTask = createAsyncThunk("tasks/addTask",
  async (param: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setAppStatus({ status: "loading" }))
    try {
      const res = await todolistsAPI.addTask(param.todolistId, param.title)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })

export const updateTask = createAsyncThunk("tasks/updateTask",
  async (param: { todolistId: string, taskId: string, model: UpdateTaskModel }, { dispatch, getState, rejectWithValue }) => {
    const { todolistId, taskId, model } = param
    dispatch(setAppStatus({ status: "loading" }))
    const task = (getState() as AppRootStateType).tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
      return rejectWithValue("task now found in the state")
    }

    const ApiModel: UpdateTaskType = {
      title: task.title,
      status: task.status,
      startDate: task.startDate,
      deadline: task.deadline,
      priority: task.priority,
      description: task.description,
      ...model
    }

    try {
      const res = await todolistsAPI.updateTask(todolistId, taskId, ApiModel)
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolistId, taskId, model }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
      return rejectWithValue(null)
    }
  })