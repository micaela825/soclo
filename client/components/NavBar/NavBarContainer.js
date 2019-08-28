import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const NavBar = ({handleClick, isLoggedIn}) => (
  <div className="navBar">
    <nav>
      <div>
        <Link to="/home" id="logo">
          SC
        </Link>
        <Link to="/search">Find A Dress</Link>
        <Link to="/closet">My Closet</Link>
        <Link to="/account">My Account</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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

// <nav>
// {isLoggedIn ? (
//    <div>

//      <Link to="/home">Home</Link>
//      <a href="#" onClick={handleClick}>
//        Logout
//      </a>
//    </div>
//  ) : (
//  <div>
//    <Link to="/login">Login</Link>
//    <Link to="/signup">Sign Up</Link>
//  </div>
//   )}
// </nav>
