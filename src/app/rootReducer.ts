import { appReducer } from "app/reducer/app-reducer"
import { authReducer } from "features/auth"
import { todolistsReducer } from "features/todolistsList/todolist/reducer/todolists-reducer"
import { tasksReducer } from "features/todolistsList/todolist/task/reducer/tasks-reducer"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})