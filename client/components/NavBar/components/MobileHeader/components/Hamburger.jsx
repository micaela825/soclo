import './index.scss'

import classnames from 'classnames'
import React from 'react'
// import {useSelector} from 'react-redux'

const Hamburger = ({isActive, handleClick}) => {
  return (
    <button
      className={classnames('hamburger', {
        'hamburger--active': isActive
      })}
      onClick={handleClick}
      type="button"
      aria-label="menu"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  )
}

export default Hamburger
