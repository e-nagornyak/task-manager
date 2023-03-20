import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { logoutTC, selectIsLoggedIn } from "features/auth"
import { useAppDispatch, useAppSelector } from "hooks"
import React, { FC, useCallback } from "react"

export const ButtonAppBar: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const LogoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  return <Box sx={{ flexGrow: 1 }}>
    <AppBar color={"secondary"} position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Todolists
        </Typography>
        {isLoggedIn && <Button variant='outlined' onClick={LogoutHandler} color='inherit'>Log out</Button>}
      </Toolbar>
    </AppBar>
  </Box>
}
