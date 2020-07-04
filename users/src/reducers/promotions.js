import { FILTER_PROMOTIONS, LOAD_USER_PROMOTIONS } from '../actions/types';

const initState = {
  stores: [],
  filters: {
    store: 'all',
    group: 'all',
    keyword: '',
    promoType: 'all'
  }
};

export default (state = initState, action) => {
  const { type, payload } = action;
  const disabled = localStorage.getItem('accountDisabled')
    ? localStorage.getItem('accountDisabled')
    : 'false';

  switch (type) {
    case LOAD_USER_PROMOTIONS:
      return disabled === 'false'
        ? {
            ...state,
            stores: payload
          }
        : initState;

    case FILTER_PROMOTIONS:
      return disabled === 'false'
        ? {
            ...state,
            filters: { ...payload }
          }
        : initState;

    default:
      return state;
  }
};
