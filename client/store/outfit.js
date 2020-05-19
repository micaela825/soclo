import axios from 'axios'

const initialState = {
  outfits: []
}

// action types

const GET_OUTFITS = 'GET_OUTFITS'
const ADDED_OUTFIT = 'ADDED_OUTFIT'

// action creators:

const gotOutfits = outfits => ({type: GET_OUTFITS, outfits})
const gotAddedOutfit = outfit => ({type: ADDED_OUTFIT, outfit})

// thunk creators:

export const getOutfits = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`/api/outfits`)
      dispatch(gotOutfits(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addOutfit = articles => {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`/api/outfits`, articles)
      dispatch(gotAddedOutfit(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// reducer:

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OUTFITS:
      return {...state, outfits: action.outfits}
    case ADDED_OUTFIT:
      return {...state, outfits: action.outfit}
    default:
      return state
  }
}
