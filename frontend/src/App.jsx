import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import './assets/styles/index.scss'

function App() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
