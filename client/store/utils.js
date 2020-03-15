// actions

const IS_NAV_OPEN = 'IS_NAV_OPEN'

const initialState = {
  isNavOpen: false
}

// action creators

export const setIsNavOpen = payload => ({
  type: IS_NAV_OPEN,
  payload
})

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_NAV_OPEN:
      return {...state, isNavOpen: action.payload}
    default:
      return state
  }
}
