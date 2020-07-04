import { APP_LOADING, APP_ERRORS, LOADING_SUCCESS } from '../actions/types';

const initState = {
  loading: false,
  error: []
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };

    case APP_ERRORS:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case LOADING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};
