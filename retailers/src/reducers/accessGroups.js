import {
  GET_ACCESS_GROUPS,
  CREATE_ACCESS_GROUP,
  REMOVE_ACCESS_GROUPS,
  UPDATE_ACCESS_GROUP
} from '../actions/types'

const initState = []

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ACCESS_GROUPS:
      return payload

    case UPDATE_ACCESS_GROUP:
      return state.map(elem => {
        if (elem._id === payload._id) elem = payload
        return elem
      })

    case CREATE_ACCESS_GROUP:
      state.unshift(payload)
      return state

    case REMOVE_ACCESS_GROUPS:
      return state.filter(elem => !payload.includes(elem._id))

    default:
      return state
  }
}
