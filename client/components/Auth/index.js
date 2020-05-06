import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../../store'
import './index.scss'
import Icon from '../../../public/icon'
// import isEmailValid from './utils/isEmailValid'
// import isPasswordValid from './utils/isPasswordValid'

const BASE_CLASS = 'auth'

class AuthForm extends Component {
  constructor(props) {
    super(props)

    this.alternativeFormName = this.alternativeFormName.bind(this)
    this.alternativeRoute = this.alternativeRoute.bind(this)
    this.err = ''
  }

  alternativeFormName = name => {
    return name == 'signup' ? 'Sign in' : 'Sign up'
  }

  alternativeRoute = name => {
    return name == 'signup' ? 'login' : 'signup'
  }

  render() {
    return (
      <div className={BASE_CLASS}>
        <Icon className="icon" />
        <div className={`${BASE_CLASS}__title`}>social closet</div>
        <form
          onSubmit={this.props.handleSubmit}
          name={this.props.name}
          className={`${BASE_CLASS}__form`}
        >
          {this.props.name === 'signup' && (
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
            {this.props.displayName}
          </button>
          {this.err}
          {this.props.error &&
            this.props.error.response && (
              <div className={`${BASE_CLASS}__form__error`}>
                {this.props.error.response.data}
              </div>
            )}
        </form>
        <a href="/auth/google" className={`${BASE_CLASS}__socialauth`}>
          {this.props.displayName} with Google
        </a>
        <div className={`${BASE_CLASS}__or`}>or</div>

        <a
          href={`/${this.alternativeRoute(this.props.name)}`}
          className={`${BASE_CLASS}__route`}
        >
          {this.alternativeFormName(this.props.name)}
        </a>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Sign in',
    error: state.user.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign up',
    error: state.user.user.error
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
      dispatch(auth(userName, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
