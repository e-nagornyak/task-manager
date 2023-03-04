import { Dispatch } from 'redux'
import { ResponseType } from 'api/types'
import { AppReducerActionsType, setAppErrorAC, setAppStatusAC } from 'app/reducer/app-reducer'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppReducerActionsType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppReducerActionsType>) => {
  dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
  dispatch(setAppStatusAC('failed'))
}
