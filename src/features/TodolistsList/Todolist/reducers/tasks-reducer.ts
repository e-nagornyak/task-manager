import { todolistsAPI } from "api/todolistsAPI"
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from "api/types"
import { setAppStatus } from "app/reducer/app-reducer"
import { AppRootStateType, AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { AxiosError } from "axios"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  addTodolist,
  removeTodolist, setTodolists
} from "features/TodolistsList/Todolist/reducers/todolists-reducer"

export type TaskStateType = {
  [key: string]: TaskType[]
}

export type UpdateTaskModelDomainType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateTaskModelDomainType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks[index] = { ...tasks[index], ...action.payload.model }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(setTodolists, (state, action) => {
      action.payload.todolists.map(tl => {
        state[tl.id] = []
      })
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      // @ts-ignore
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      // @ts-ignore
      const tasks = state[action.payload.todolistId]
      // @ts-ignore
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks.splice(index, 1)
    })
  }
})

export const tasksReducer = slice.reducer
export const { updateTask, addTask } = slice.actions

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, { dispatch }) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await todolistsAPI.getTasks(todolistId)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolistId, tasks: res.data.items }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
})

export const removeTaskTC = createAsyncThunk("tasks/removeTask", async (param: { todolistId: string, taskId: string }, { dispatch }) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    await todolistsAPI.removeTask(param.todolistId, param.taskId)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolistId: param.todolistId, taskId: param.taskId }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
})

export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await todolistsAPI.addTask(todolistId, title)
    if (res.data.resultCode === 0) {
      dispatch(addTask({ task: res.data.data.item }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskModelDomainType): AppThunk =>
  async (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus({ status: "loading" }))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
      console.warn("Task now found in the state")
      return
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
        dispatch(updateTask({ todolistId, taskId, model }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error) {
      handleServerNetworkError(error as AxiosError, dispatch)
    }
  }
