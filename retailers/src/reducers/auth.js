import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_ACCOUNT,
  LOAD_ACCOUNT,
  AUTH_ERROR,
  GET_ALL_COMPANIES
} from '../actions/types'

const initState = {
  companies: [],
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') !== null,
  account: null
}

export default (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_ALL_COMPANIES:
      return { ...state, companies: payload }

    case LOAD_ACCOUNT:
      return {
        ...state,
        isAuthenticated: true,
        account: payload
      }

    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      localStorage.setItem('companyId', payload.companyId)
      localStorage.setItem('username', payload.username)
      return {
        ...state,
        ...payload,
        isAuthenticated: true
      }

    case AUTH_ERROR:
    case LOGOUT_ACCOUNT:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      localStorage.removeItem('companyId')
      localStorage.removeItem('username')
      return {
        ...state,
        token: null,
        account: null,
        isAuthenticated: false
      }

    default:
      return state
  }
}
