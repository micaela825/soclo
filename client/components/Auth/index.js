import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import './index.scss'
import Icon from '../../../public/icon'

const BASE_CLASS = 'auth'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const alternativeFormName = () => {
    console.log('display name', displayName, 'name', name)
    return name == 'signup' ? 'Sign in' : 'Sign up'
  }

  const alternativeRoute = () => {
    return name == 'signup' ? 'login' : 'signup'
  }

  return (
    <div className={BASE_CLASS}>
      <Icon className="icon" />
      <div className={`${BASE_CLASS}__title`}>social closet</div>
      <form
        onSubmit={handleSubmit}
        name={name}
        className={`${BASE_CLASS}__form`}
      >
        <input
          name="email"
          type="text"
          placeholder="email"
          className={`${BASE_CLASS}__form__input`}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          className={`${BASE_CLASS}__form__input`}
        />

        <button type="submit" className={`${BASE_CLASS}__form__submit`}>
          {displayName}
        </button>

        {error &&
          error.response && (
            <div className={`${BASE_CLASS}__form__error`}>
              {' '}
              {error.response.data}{' '}
            </div>
          )}
      </form>
      <a href="/auth/google" className={`${BASE_CLASS}__socialauth`}>
        {displayName} with Google
      </a>
      <div className={`${BASE_CLASS}__or`}>or</div>

      <a href={`/${alternativeRoute()}`} className={`${BASE_CLASS}__route`}>
        {alternativeFormName()}
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign in',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
