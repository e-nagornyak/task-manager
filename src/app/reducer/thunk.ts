import { createAsyncThunk } from "@reduxjs/toolkit"
import { authAPI } from "api/authAPI"
import { AxiosError } from "axios"
import { setIsLoggedIn } from "features/auth/reducer/auth-reducer"
import { handleServerNetworkError } from "utils/error-utils"

export const initializeAppTC = createAsyncThunk("app/initializeApp", async (param, { dispatch }) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ status: true }))
    }
  } catch (error) {
    handleServerNetworkError(error as AxiosError, dispatch)
  }
})
