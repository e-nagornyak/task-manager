import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import { App } from 'app/App'
import { store } from 'app/store'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

serviceWorker.register()
