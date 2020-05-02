import React from 'react'
import {NavBar} from './components'
import Routes from './routes'
import './style.scss'

const App = () => {
  return (
    <div id="container">
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
