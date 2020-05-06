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
      <Link to="/home" className={`${BASE_CLASS}__icon`}>
        <Icon />
      </Link>
      {!isNavOpen ? (
        <Hamburger handleClick={handleNavClick} isActive={isNavOpen} />
      ) : (
        <div
          className={`${BASE_CLASS}__open-nav`}
          onClick={() => handleNavClick()}
        >
          <Hamburger handleClick={handleNavClick} isActive={isNavOpen} />
          <Link to="/search" className={`${BASE_CLASS}__open-nav__item`}>
            search
          </Link>
          <Link to="/closet" className={`${BASE_CLASS}__open-nav__item`}>
            closet
          </Link>
          <Link to="/account" className={`${BASE_CLASS}__open-nav__item`}>
            account
          </Link>
          <a
            href="#"
            className={`${BASE_CLASS}__open-nav__item`}
            onClick={handleClick}
          >
            Log out
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
