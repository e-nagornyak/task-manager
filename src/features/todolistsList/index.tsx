import * as todolistsThunks from "./todolist/reducer/thunks"
import { slice } from "./todolist/reducer/todolists-reducer"
import * as tasksThunks from "./todolist/task/reducer/thunks"

const todolistsActions = {
  ...todolistsThunks,
  ...slice.actions
}

export { tasksThunks, todolistsActions }
export { TodolistsList } from "./TodolistsList"
export * from "./types"