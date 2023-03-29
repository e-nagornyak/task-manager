import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "app/rootReducer"
import { AnyAction } from "redux"
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk"

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("app/rootReducer", () => {
    store.replaceReducer(rootReducer)
  })
}

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

