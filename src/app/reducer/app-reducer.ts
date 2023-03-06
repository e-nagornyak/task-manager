import { AppThunk } from '../store'
import { authAPI } from 'api/authAPI'
import { setIsLoggedIn } from 'features/Login/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerNetworkError } from 'utils/error-utils'
import { AxiosError } from 'axios'

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppStateType = typeof initialState
const initialState = {
  status: 'idle' as AppStatusType,
  error: null as null | string,
  isInitialized: false
}

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setAppStatus(state, action: PayloadAction<{ status: AppStatusType }>) {
      state.status = action.payload.status
    },
    setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  }
})

export const appReducer = slice.reducer
export const { setAppStatus, setIsInitialized, setAppError } = slice.actions

export const initializeAppTC = (): AppThunk => async (dispatch) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: true }))
    }
    dispatch(setIsInitialized({ isInitialized: true }))
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
}
