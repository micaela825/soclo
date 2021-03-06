import React from 'react'
import classnames from 'classnames'
import './index.scss'

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
