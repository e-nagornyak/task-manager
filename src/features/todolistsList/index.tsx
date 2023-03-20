import * as todolistsThunks from "./todolist/reducer/thunks"
import * as tasksThunks from "./todolist/task/reducer/thunks"
import {slice}  from './todolist/reducer/todolists-reducer'

const todolistsActions  = {
  ...todolistsThunks,
  ...slice.actions
}

export {
  tasksThunks,
  todolistsActions
}
export * from './types'