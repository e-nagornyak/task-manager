import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loginTC, logoutTC } from "features/auth/reducer/thunks"

const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ status: boolean }>) {
      state.isLoggedIn = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state) => {
      state.isLoggedIn = true
    })
      .addCase(logoutTC.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  }
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions


