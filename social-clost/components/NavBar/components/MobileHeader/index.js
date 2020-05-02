import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../../store/index'
import {Link} from 'react-router-dom'
import Hamburger from './components/Hamburger'
import Icon from '../../../../../public/icon'
import './index.scss'

const BASE_CLASS = 'header-mobile'
const MobileHeader = ({handleClick}) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  function handleNavClick() {
    setIsNavOpen(!isNavOpen)
    const body = document.getElementsByTagName('body')[0]

    if (!isNavOpen) {
      body.setAttribute('style', 'overflow: hidden')
    } else {
      body.setAttribute('style', 'overflow: auto')
    }
  }

  return (
    <div className={BASE_CLASS}>
      <Link to="/home">
        <Icon />
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
