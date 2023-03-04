import { authAPI } from 'api/authAPI'
import { LoginParamsType } from 'api/types'
import { setAppErrorACType, setAppStatusAC, setAppStatusACType } from 'app/reducer/app-reducer'
import { AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'

type ActionsType = ReturnType<typeof setIsLoggedInAC> | setAppErrorACType | setAppStatusACType
type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.value }
    default:
      return state
  }
}

export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', payload: { value } } as const)

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
