import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, fetchTodolists, removeTodolist } from "features/todolistsList/todolist/reducer/thunks"
import { addTask, fetchTasks, removeTask, updateTask } from "features/todolistsList/todolist/task/reducer/thunks"
import { TaskStateType } from "features/todolistsList/todolist/task/reducer/types"

const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      delete state[action.payload.todolistId]
    })
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      action.payload.todolists.map(tl => state[tl.id] = [])
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload?.taskId)
      tasks.splice(index, 1)
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    })
  }
})

export const tasksReducer = slice.reducer

