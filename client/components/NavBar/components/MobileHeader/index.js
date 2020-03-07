import React from 'React'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../../store/index'
import {Link} from 'react-router-dom'
import './index.scss'

const MobileHeader = ({handleClick}) => {
  const isNavOpen = false
  const BASE_CLASS = 'header-mobile'

  return (
    <div className="mobile-header">
      <Link to="/home" id="logo">
        SC
      </Link>
      <button>x</button>
      <Link to="/search">Find A Dress</Link>
      <Link to="/closet">My Closet</Link>
      <Link to="/account">My Account</Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
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
