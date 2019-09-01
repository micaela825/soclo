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
const GET_SINGLE_DRESS = 'GET_SINGLE_DRESS'
const ADDED_DRESS = 'ADDED_DRESS'
const UPDATED_DRESS = 'UPDATED DRESS'

/**
 * ACTION CREATORS
 */
const gotDresses = dresses => ({type: GET_DRESSES, dresses})
const gotAddedDress = dress => ({type: ADDED_DRESS, dress})
const gotDress = dress => ({type: GET_SINGLE_DRESS, dress})
const gotUpdatedDress = dress => ({type: UPDATED_DRESS, dress})

/**
 * THUNK CREATORS
 */

export const getDresses = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/closet`)
      dispatch(gotDresses(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getSingleDress = dressId => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/closet/${dressId}`)
      console.log('res.data in GET DRESS', res.data)
      dispatch(gotDress(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addDress = dress => {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`/api/closet`, dress)
      dispatch(gotAddedDress(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateDress = dress => {
  console.log('dress to update', dress)
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DRESSES:
      return {...state, dresses: action.dresses}
    case GET_SINGLE_DRESS:
      return {...state, dress: action.dress}
    case ADDED_DRESS:
      return {...state, dress: action.dress}
    case UPDATED_DRESS:
      return {...state, dress: action.dress}
    default:
      return state
  }
}
