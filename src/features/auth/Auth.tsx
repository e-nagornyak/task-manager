import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { loginTC } from "features/auth/reducer/thunks"
import { selectIsLoggedIn } from "features/auth/selectors"
import { useFormik } from "formik"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useAppSelector } from "hooks/useAppSelector"
import React, { FC } from "react"
import { Navigate } from "react-router-dom"

export const Auth: FC = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
    validate: values => {
      if (!values.email) {
        return {
          email: "Email is required"
        }
      }
      if (!values.password) {
        return {
          password: "Incorrect password"
        }
      }
    }
  })
  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return <Grid container justifyContent={"center"}>
    <Grid item justifyContent={"center"}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={"https://social-network.samuraijs.com/"}
                 target={"_blank"}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label='Email'
              margin='normal'
              placeholder={"example@gmail.com"}
              color={"secondary"}
              id={"outlined-error-helper-text"}
              helperText={formik.errors.email}
              error={!!formik.errors.email && formik.touched.email}
              {...formik.getFieldProps("email")}
            />
            <TextField
              type='password'
              label='Password'
              margin='normal'
              color={"secondary"}
              id={"outlined-error-helper-text"}
              helperText={formik.errors.password}
              error={!!formik.errors.password && formik.touched.password}
              {...formik.getFieldProps("password")}
            />
            <FormControlLabel
              label={"Remember me"}
              control={
                <Checkbox
                  color={"secondary"}
                  {...formik.getFieldProps("rememberMe")}
                  checked={formik.values.rememberMe}
                />
              } />
            <Button type={"submit"} variant={"contained"} color={"secondary"}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}