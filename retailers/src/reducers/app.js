import { TOGGLE_SIDE_NAV, LOADING, ERRORS, SUCCESS } from '../actions/types'

const initState = {
  sideNavOpen: true,
  loading: false
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case TOGGLE_SIDE_NAV:
      return { ...state, ...payload }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    case ERRORS:
      return {
        ...state,
        loading: false
      }

    case SUCCESS:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
