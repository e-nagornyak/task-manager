import { authAPI } from 'api/authAPI'
import { LoginParamsType } from 'api/types'
import { setAppStatus } from 'app/reducer/app-reducer'
import { AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ status: boolean }>) {
      state.isLoggedIn = action.payload.status
    }
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: true }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: false }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}
