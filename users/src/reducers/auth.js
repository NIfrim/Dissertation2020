import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_ACCOUNT,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initState = {
  _id: null,
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token') !== null
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true
      };

    case REGISTER_SUCCESS:
      return {
        ...state
      };

    case AUTH_ERROR:
    case LOGOUT_ACCOUNT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        _id: null,
        token: localStorage.getItem('token'),
        isAuthenticated: localStorage.getItem('token') !== null
      };

    default:
      return state;
  }
};
