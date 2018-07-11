import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'

import './prototypes'
import './index.css'
import App from './App'
//import registerServiceWorker from './registerServiceWorker'
import { unregister } from './registerServiceWorker'
import configureStore from './configureStore'
import axios from './axios-instance'

if (process.env.NODE_ENV === 'development') {
  window.axios = axios
}

unregister()

const { store, persistor } = configureStore()

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
//registerServiceWorker()

console.log('process.env.COOKIE_KEY', process.env.COOKIE_KEY)
