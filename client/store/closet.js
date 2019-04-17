import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DRESSES = 'GET_DRESSES'

/*
 * INITIAL STATE
 */
const initialState = {
  // defaultUser: {},
  dresses: []
}
//const defaultUser = {}

/**
 * ACTION CREATORS
 */
const gotDresses = dresses => ({type: GET_DRESSES, dresses})

/**
 * THUNK CREATORS
 */

export const getDresses = () => async dispatch => {
  try {
    const res = await axios.get('/api/dresses')
    dispatch(gotDresses(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DRESSES:
      return {...initialState, dresses: action.dresses}

    default:
      return state
  }
}
