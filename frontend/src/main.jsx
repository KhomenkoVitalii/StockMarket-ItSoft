import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/AppRouter'
import { RouterProvider } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider router={AppRouter} />
  </AppContextProvider>
)
