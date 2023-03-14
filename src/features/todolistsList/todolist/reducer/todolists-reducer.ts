import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppStatusType } from "app/reducer/app-reducer"
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC
} from "features/todolistsList/todolist/reducer/thunks"

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
    changeTaskFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValueType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    setTodolistStatus(state, action: PayloadAction<{ todolistId: string, status: AppStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      return state.filter(el => el.id !== action.payload.todolistId)
    })
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    })
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
    })
  }
})

export const todolistsReducer = slice.reducer
export const { setTodolistStatus, changeTaskFilter } = slice.actions
