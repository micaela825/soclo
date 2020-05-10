import axios from 'axios'
import history from '../history'

/*
 * INITIAL STATE
 */
const initialState = {
  // defaultUser: {},
  dresses: [],
  dress: {},
  outfits: {}
}

/**
 * ACTION TYPES
 */
const GET_DRESSES = 'GET_DRESSES'
const GET_SINGLE_DRESS = 'GET_SINGLE_DRESS'
const ADDED_DRESS = 'ADDED_DRESS'
const UPDATED_DRESS = 'UPDATED DRESS'
const ADD_WEAR = 'ADD_WEAR'
const ADDED_OUTFIT = 'ADDED_OUTFIT'
// const GET_OUTFITS = 'GET_OUTFITS'

/**
 * ACTION CREATORS
 */
const gotDresses = dresses => ({type: GET_DRESSES, dresses})
const gotAddedDress = dress => ({type: ADDED_DRESS, dress})
const gotAddedOutfit = outfit => ({type: ADDED_OUTFIT, outfit})
const gotDress = dress => ({type: GET_SINGLE_DRESS, dress})
const gotUpdatedDress = dress => ({type: UPDATED_DRESS, dress})
const gotDressToIncrement = dressId => ({type: ADD_WEAR, dressId})

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

export const addOutfit = articles => {
  console.log('here in store', articles)
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.put(`/api/closet/outfits`, articles)
      console.log('data in added outfit in store', data)
      dispatch(gotAddedOutfit(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateDress = (dress, id) => {
  const dressId = id
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.put(`/api/closet/${dressId}/edit`, dress)
      dispatch(gotUpdatedDress(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addWear = dressId => {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`/api/closet/${dressId}`, dressId)

      dispatch(gotDressToIncrement(data))
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
    case GET_SINGLE_DRESS:
      return {...state, dress: action.dress}
    case ADDED_DRESS:
      return {...state, dress: action.dress}

    case ADDED_OUTFIT:
      return {...state, outfits: action.outfit}
    case UPDATED_DRESS: {
      return {...state, dress: action.dress}
    }
    case ADD_WEAR: {
      return {...state, dressId: action.dressId}
    }
    default:
      return state
  }
}
