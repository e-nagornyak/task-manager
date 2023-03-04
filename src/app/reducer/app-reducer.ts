import { AppThunk } from '../store'
import { authAPI } from 'api/authAPI'
import { setIsLoggedInAC } from 'features/Login/auth-reducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState

export type setAppErrorACType = ReturnType<typeof setAppErrorAC>
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type AppReducerActionsType = setAppErrorACType | setAppStatusACType | setAppInitializedACType

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error }
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status }
    case 'APP/SET-IT-INITIALIZED':
      return { ...state, isInitialized: action.payload.value }
    default:
      return { ...state }
  }
}
// actions
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', payload: { error } } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', payload: { status } } as const)
export const setAppInitializedAC = (value: boolean) => ({ type: 'APP/SET-IT-INITIALIZED', payload: { value } } as const)

// thunks
export const initializeAppTC = (): AppThunk => dispatch => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    }
    dispatch(setAppInitializedAC(true))
  })
}
