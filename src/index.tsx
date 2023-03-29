import { ThemeProvider } from "@mui/material"
import { store } from "app"
import { App } from "app/App"
import { theme } from "assets/theme"
import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

const rerenderEntireTree = () => {
  const root = createRoot(document.getElementById("root") as HTMLElement)
  root.render(
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  )
}
rerenderEntireTree()
serviceWorker.register()

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("app/App", () => {
    rerenderEntireTree()
  })
}