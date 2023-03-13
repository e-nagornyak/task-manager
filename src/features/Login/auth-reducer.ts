import { authAPI } from "api/authAPI"
import { LoginParamsType } from "api/types"
import { setAppStatus } from "app/reducer/app-reducer"
import { AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ status: boolean }>) {
      state.isLoggedIn = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

export const loginTC = createAsyncThunk("auth/login", async (param: LoginParamsType, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.login(param)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }))
      return { isLoggedIn: true }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
    return rejectWithValue({ errors: [(error as AxiosError).message], fieldsErrors: undefined })
  }
})

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: false }))
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}
