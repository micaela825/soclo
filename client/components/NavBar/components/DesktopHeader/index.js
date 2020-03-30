import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../../store/index'
import {Link} from 'react-router-dom'
import './index.scss'
import Icon from '../../../../../public/icon'

const BASE_CLASS = 'desktop-header'

const DesktopHeader = ({handleClick}) => (
  <div className={BASE_CLASS}>
    <Link to="/home">
      <Icon />
    </Link>
    <div className={`${BASE_CLASS}__links`}>
      <Link to="/search">Find A Dress</Link>
      <Link to="/closet">My Closet</Link>
      <Link to="/account">My Account</Link>
    </div>

    <a href="#" onClick={handleClick} className={`${BASE_CLASS}__logout`}>
      Logout
    </a>
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

export default connect(mapState, mapDispatch)(DesktopHeader)

/**
 * PROP TYPES
 */
DesktopHeader.propTypes = {
  handleClick: PropTypes.func.isRequired
}
