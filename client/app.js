import React from 'React'
import {NavBar} from './components'
import Routes from './routes'
import './index.scss'

const App = () => {
  return (
    <div id="container">
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
