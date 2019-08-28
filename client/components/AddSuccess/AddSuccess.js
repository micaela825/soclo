import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class AddSuccess extends Component {
  render() {
    return (
      <div>
        <h1>successfully submitted ✅ </h1>
        <Link to="/closet">return to my closet</Link>
        <Link to="/add"> add another</Link>
      </div>
    )
  }
}
