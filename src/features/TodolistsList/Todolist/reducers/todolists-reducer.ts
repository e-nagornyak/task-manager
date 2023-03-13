import { AppStatusType, setAppStatus } from "app/reducer/app-reducer"
import { AppThunk } from "app/store"
import { handleServerNetworkError } from "utils/error-utils"
import { todolistsAPI } from "api/todolistsAPI"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export type TodolistDomainType = TodolistType & { filter: FilterValueType; entityStatus: AppStatusType }
export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
      // const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      // if (index > -1) {
      //   state.slice(index, 1)
      // }
      return state.filter(el => el.id !== action.payload.todolistId)
    },
    changeTodolistTitle(state, action: PayloadAction<{ todolistId: string, title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
      // tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl
    },
    changeTaskFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValueType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
      // return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl)
    },
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: "all",
        entityStatus: "idle"
      }))
    },
    setTodolistStatus(state, action: PayloadAction<{ todolistId: string, status: AppStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.status
    }
  }
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolist, setTodolists, setTodolistStatus,
  changeTodolistTitle, changeTaskFilter, addTodolist
} = slice.actions

export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodolists({ todolists: res.data }))
    dispatch(setAppStatus({ status: "succeeded" }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(setTodolistStatus({ todolistId, status: "loading" }))
  try {
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolist({ todolistId }))
    dispatch(setAppStatus({ status: "succeeded" }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const addTodolistTC = (title: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await todolistsAPI.addTodolist(title)
    dispatch(addTodolist({ todolist: res.data.data.item }))
    dispatch(setAppStatus({ status: "succeeded" }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(setTodolistStatus({ todolistId, status: "loading" }))
  try {
    await todolistsAPI.updateTodolist(todolistId, title)
    dispatch(changeTodolistTitle({ todolistId, title }))
    dispatch(setAppStatus({ status: "succeeded" }))
    dispatch(setTodolistStatus({ todolistId, status: "succeeded" }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}
