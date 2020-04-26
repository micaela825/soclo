// actions

const IS_NAV_OPEN = 'IS_NAV_OPEN'
const IS_MODAL_OPEN = 'IS_MODAL_OPEN'

const initialState = {
  isNavOpen: false,
  isModalOpen: false
}

// action creators

export const setIsNavOpen = payload => ({
  type: IS_NAV_OPEN,
  payload
})

export const setIsModalOpen = payload => {
  return {
    type: IS_MODAL_OPEN,
    payload
  }
}

// reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case IS_NAV_OPEN:
      return {...state, isNavOpen: action.payload}
    case IS_MODAL_OPEN:
      return {...state, isModalOpen: action.payload}
    default:
      return state
  }
}
