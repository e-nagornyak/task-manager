import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "features/auth/reducer/auth-reducer"
import { todolistsReducer } from "features/todolistsList/todolist/reducer/todolists-reducer"
import { tasksReducer } from "features/todolistsList/todolist/task/reducer/tasks-reducer"
import { AnyAction, combineReducers } from "redux"
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "./reducer/app-reducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

