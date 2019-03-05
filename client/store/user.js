import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GOT_USERS = 'GOT_USERS'

/**
 * INITIAL STATE
 */
const initialState = {
  defaultUser: {},
  users: []
}
//const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotUsers = users => ({type: GOT_USERS, users})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(gotUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res

  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...initialState, defaultUser: action.user}
    case REMOVE_USER:
      return {...initialState, defaultUser: {}}
    case GOT_USERS:
      return {...initialState, users: action.users}
    default:
      return state
  }
}
