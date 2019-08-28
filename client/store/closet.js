import axios from 'axios'
import history from '../history'

/*
 * INITIAL STATE
 */
const initialState = {
  // defaultUser: {},
  dresses: [],
  dress: {}
}

/**
 * ACTION TYPES
 */
const GET_DRESSES = 'GET_DRESSES'
const ADDED_DRESS = 'ADDED_DRESS'

/**
 * ACTION CREATORS
 */
const gotDresses = dresses => ({type: GET_DRESSES, dresses})
const gotAddedDress = dress => ({type: ADDED_DRESS, dress})

/**
 * THUNK CREATORS
 */

export const getDresses = () => {
  console.log('in get Dresses')
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/dresses`)

      dispatch(gotDresses(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addDress = dress => {
  console.log('DRESS', dress)
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`/api/dresses`, dress)
      dispatch(gotAddedDress(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DRESSES:
      return {...state, dresses: action.dresses}
    case ADDED_DRESS:
      return {...state, dress: action.dress}
    default:
      return state
  }
}
