import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { logoutTC } from "features/auth/reducer/thunks"
import * as React from "react"
import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "hooks/hooks"

export default function ButtonAppBar() {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const LogoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todolists
          </Typography>
          {isLoggedIn && <Button onClick={LogoutHandler} color='inherit'>Log out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
