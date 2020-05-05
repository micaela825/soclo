import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

const baseClass = 'add-success'

class AddSuccess extends Component {
  render() {
    return (
      <div className={`${baseClass}`}>
        <h1>successfully submitted ✅ </h1>
        <Link to="/closet">return to my closet</Link>
        <Link to="/add"> add another</Link>
      </div>
    )
  }
}

export default AddSuccess
