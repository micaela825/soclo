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
    <Link to="/home" className={`${BASE_CLASS}__icon`}>
      <Icon />
    </Link>
    <div className={`${BASE_CLASS}__links`}>
      <Link to="/search" className={`${BASE_CLASS}__links__link`}>
        search
      </Link>
      <Link to="/closet" className={`${BASE_CLASS}__links__link`}>
        Closet
      </Link>
      <Link to="/account" className={`${BASE_CLASS}__links__link`}>
        Account
      </Link>
    </div>

    <a href="#" onClick={handleClick} className={`${BASE_CLASS}__logout`}>
      Log out
    </a>
  </div>
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

export default connect(mapState, mapDispatch)(DesktopHeader)

DesktopHeader.propTypes = {
  handleClick: PropTypes.func.isRequired
}
