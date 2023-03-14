import { createSlice } from "@reduxjs/toolkit"
import { TaskPriorities, TaskStatuses, TaskType } from "api/types"
import { addTaskTC, fetchTasks, removeTaskTC, updateTaskTC } from "app/reducer/thunks"
import { addTodolist, removeTodolist, setTodolists } from "features/TodolistsList/Todolist/reducers/todolists-reducer"

export type TaskStateType = {
  [key: string]: TaskType[]
}

export type UpdateTaskModel = {
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
  reducers: {},
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
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload?.taskId)
      tasks.splice(index, 1)
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
  }
})

export const tasksReducer = slice.reducer

