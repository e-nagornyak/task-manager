import { createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "api/authAPI"
import { LoginParamsType } from "api/types"
import { setAppStatus } from "app/reducer/app-reducer"
import { AxiosError } from "axios"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"

export const loginTC = createAsyncThunk("auth/auth", async (param: LoginParamsType, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.login(param)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
    return rejectWithValue({ errors: [(error as AxiosError).message], fieldsErrors: undefined })
  }
})

export const logoutTC = createAsyncThunk("auth/logout", async (param, { dispatch, rejectWithValue }) => {
  dispatch(setAppStatus({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setAppStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
    return rejectWithValue(null)
  }
})
