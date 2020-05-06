import React from 'react'
import {NavBar} from './components'
import Routes from './routes'
import './style.scss'

const App = () => {
  return (
    <div id="app">
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
