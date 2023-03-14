import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "api/authAPI"
import { AxiosError } from "axios"
import { setIsLoggedIn } from "features/Login/auth-reducer"
import { handleServerNetworkError } from "utils/error-utils"

export type AppStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppStateType = ReturnType<typeof slice.getInitialState>

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as AppStatusType,
    error: null as null | string,
    isInitialized: false
  },
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatus(state, action: PayloadAction<{ status: AppStatusType }>) {
      state.status = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAppTC.fulfilled, (state) => {
      state.isInitialized = true
    })
  }
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppError } = slice.actions

export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, { dispatch }) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: true }))
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
})


