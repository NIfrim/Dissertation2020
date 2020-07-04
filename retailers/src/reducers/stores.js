import {
  GET_STORES,
  CREATE_STORE,
  REMOVE_STORES,
  UPDATE_STORE
} from '../actions/types'

const initState = []

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_STORES:
      return payload

    case UPDATE_STORE:
      return state.map(elem => {
        if (elem._id === payload._id) {
          elem = payload
        }
        return elem
      })

    case CREATE_STORE:
      state.unshift(payload)
      return state

    case REMOVE_STORES:
      console.log(payload)
      return state.filter(elem => !payload.includes(elem._id))

    default:
      return state
  }
}
