import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { selectError, setAppError } from "app"
import { useAppDispatch,useAppSelector } from "hooks"
import React from "react"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbars = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}