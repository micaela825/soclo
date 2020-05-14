import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.scss'

const BASE_CLASS = 'add-success'

class AddSuccess extends Component {
  render() {
    return (
      <div className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}__title`}>successfully submitted ✅ </div>
        <Link to="/closet" className={`${BASE_CLASS}__closeBtn`}>
          return to my closet
        </Link>
        <Link to="/add" className={`${BASE_CLASS}__addBtn`}>
          {' '}
          add another
        </Link>
      </div>
    )
  }
}

export default AddSuccess
