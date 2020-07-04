import { DATABASE_UPDATING, DATABASE_UPDATED } from '../actions/types';

const initState = {
  loading: false,
  errors: {}
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DATABASE_UPDATING:
      return {
        ...state,
        loading: true,
        errors: null
      };

    case DATABASE_UPDATED:
      return {
        ...state,
        loading: false,
        errors: null
      };

    default:
      return state;
  }
};
