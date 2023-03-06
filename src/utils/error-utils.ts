import { Dispatch } from 'redux'
import { ResponseType } from 'api/types'
import { setAppError, setAppStatus } from 'app/reducer/app-reducer'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Some error occurred' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  const errorMessage = error.message ? error.message : 'Some error occurred'
  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: 'failed' }))
}
