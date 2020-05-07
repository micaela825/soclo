import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import DesktopHeader from './components/DesktopHeader/index'
import MobileHeader from './components/MobileHeader/index'
import './index.scss'

const NavBar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <Fragment>
        <DesktopHeader handleClick={handleClick} />
        <MobileHeader handleClick={handleClick} />
      </Fragment>
    ) : (
      <Fragment>
        <Link to="/login" className="auth__login">
          Login
        </Link>
        <Link to="/signup" className="auth__signup">
          Sign Up
        </Link>
      </Fragment>
    )}
  </nav>
)

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

export default connect(mapState, mapDispatch)(NavBar)

NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
