import {
  GET_ADDRESS,
  GET_COORDINATES,
  MAP_ERROR,
  MAP_LOADING
} from '../actions/types'

const initState = {
  loading: false,
  locationId: '',
  number: '',
  city: '',
  street: '',
  postcode: '',
  country: '',
  latitude: 0.0,
  longitude: 0.0
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_COORDINATES:
    case GET_ADDRESS:
      return { ...state, ...payload, loading: false }

    case MAP_LOADING:
      return { ...state, loading: true }

    case MAP_ERROR:
      return { ...payload, loading: false }

    default:
      return state
  }
}
