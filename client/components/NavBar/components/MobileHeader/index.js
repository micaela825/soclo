import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../../store/index'
import {Link} from 'react-router-dom'
import Hamburger from './components/Hamburger'
import './index.scss'

const BASE_CLASS = 'header-mobile'
const MobileHeader = ({handleClick}) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  function handleNavClick() {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <div className={BASE_CLASS}>
      <Link to="/home" id="logo" className={`${BASE_CLASS}__logo`}>
        SC
      </Link>
      {!isNavOpen ? (
        <Hamburger handleClick={handleNavClick} isActive={isNavOpen} />
      ) : (
        <div className={`${BASE_CLASS}__nav`} onClick={() => handleNavClick()}>
          <Hamburger handleClick={handleNavClick} isActive={isNavOpen} />
          <Link to="/search">Find A Dress</Link>
          <Link to="/closet">My Closet</Link>
          <Link to="/account">My Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(MobileHeader)

/**
 * PROP TYPES
 */
MobileHeader.propTypes = {
  handleClick: PropTypes.func.isRequired
}
