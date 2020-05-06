import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import './index.scss'
import Icon from '../../../public/icon'
import isEmailValid from './utils/isEmailValid'
import isPasswordValid from './utils/isPasswordValid'

const BASE_CLASS = 'auth'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, signUpError} = props

  const alternativeFormName = () => {
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
        {name === 'signup' && (
          <input
            name="userName"
            type="text"
            placeholder="your name"
            className={`${BASE_CLASS}__form__input`}
          />
        )}
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
        {signUpError && <div>{signUpError}</div>}
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

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign in',
    error: state.user.user.error,
    signUpError: ''
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign up',
    error: state.user.user.error,
    signUpError: ''
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.userName ? evt.target.userName.value : ''
      if (email && !isEmailValid(email)) {
        console.log(
          'todo - make component stateful & add sign up error on local state'
        )
      } else if (password && !isPasswordValid) {
        console.log(
          'todo - make component stateful & add sign up error on local state'
        )
      } else {
        dispatch(auth(userName, email, password, formName))
      }
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
  error: PropTypes.object,
  signUpError: PropTypes.string
}
