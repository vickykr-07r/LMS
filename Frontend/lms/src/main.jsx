import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { Context } from './Context/Context.jsx'
import { Provider } from "react-redux";
import { Store } from './Redux/Store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Context>
      <Provider store={Store}>
     <App />
    </Provider>
    </Context>
    </BrowserRouter>
  </StrictMode>,
)
