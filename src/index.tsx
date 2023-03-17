import { ThemeProvider } from "@mui/material"
import { App, store } from "app"
import { theme } from "assets/theme"
import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)

serviceWorker.register()
