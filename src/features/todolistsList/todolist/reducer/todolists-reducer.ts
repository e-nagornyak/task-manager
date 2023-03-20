import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppStatusType } from "app/reducer/app-reducer"
import { FilterValueType, TodolistDomainType } from "features/todolistsList"
import {
  addTodolist,
  changeTodolistTitle,
  fetchTodolists,
  removeTodolist
} from "features/todolistsList/todolist/reducer/thunks"

export const slice = createSlice({
  name: "todolist",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValueType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    setTodolistStatus(state, action: PayloadAction<{ todolistId: string, status: AppStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => ({ ...tl, filter: "all", entityStatus: "idle" }))
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      return state.filter(el => el.id !== action.payload.todolistId)
    })
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    })
    builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      state[index].title = action.payload.title
    })
  }
})

export const todolistsReducer = slice.reducer
export const { setTodolistStatus, changeTodolistFilter } = slice.actions
