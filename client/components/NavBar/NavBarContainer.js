import React from 'React'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import DesktopHeader from './components/DesktopHeader/index'
import MobileHeader from './components/MobileHeader/index'
import './index.scss'

const NavBar = ({handleClick, isLoggedIn}) => (
  <div className="navBar">
    <nav>
      {isLoggedIn ? (
        <div>
          <DesktopHeader />
          <MobileHeader />
          {/* <div>
            <Link to="/home" id="logo">
              SC
            </Link>
            <Link to="/search">Find A Dress</Link>
            <Link to="/closet">My Closet</Link>
            <Link to="/account">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div> */}
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

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

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
NavBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
