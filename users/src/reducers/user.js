import {
  LOAD_USER_ACCOUNT,
  CHANGE_THEME,
  UPDATE_USER_DETAILS,
  UPDATE_ACCOUNT_SETTINGS,
  SET_DEVICE_INFO,
  UPDATE_USER_PASSWORD,
  DELETE_USER,
  TOGGLE_ACCOUNT_DISABLED,
  USER_VIEWED_PROMOTION,
  USER_USED_PROMOTION
} from '../actions/types';

const initState = {
  _id: null,
  avatar: null,
  firstName: null,
  lastName: null,
  email: null,
  account: {
    backupEmail: null,
    mobile: null,
    appMode: 'privacy',
    shareLocation: false,
    smsNotifications: false,
    emailNotifications: false,
    twoFactorAuth: false,
    theme: localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : 'light',
    fontScale: 1.0,
    accountDisabled: localStorage.getItem('accountDisabled')
      ? localStorage.getItem('accountDisabled')
      : false
  },
  device: {
    platform: null,
    loggedIn: false,
    location: {
      latitude: null,
      longitude: null,
      city: null,
      street: null,
      postcode: null
    }
  },
  usedPromotions: [],
  viewedPromotions: []
};

export default (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_USER:
      localStorage.removeItem('theme');
      localStorage.removeItem('accountDisabled');
      return initState;

    case TOGGLE_ACCOUNT_DISABLED:
      localStorage.setItem('accountDisabled', payload);
      return {
        ...state,
        account: { ...state.account, accountDisabled: payload }
      };

    case SET_DEVICE_INFO:
      return { ...state, device: { ...state.device, ...payload } };

    case UPDATE_ACCOUNT_SETTINGS:
      localStorage.setItem('theme', payload.theme);
      return { ...state, account: { ...state.account, ...payload } };

    case USER_USED_PROMOTION:
    case USER_VIEWED_PROMOTION:
    case UPDATE_USER_PASSWORD:
    case UPDATE_USER_DETAILS:
    case LOAD_USER_ACCOUNT:
      return {
        ...state,
        ...payload,
        viewedPromotions: payload.viewedPromotions
          ? payload.viewedPromotions.map((promo) => promo._id)
          : state.viewedPromotions,
        usedPromotions: payload.usedPromotions
          ? payload.usedPromotions.map((promo) => promo._id)
          : state.usedPromotions
      };

    case CHANGE_THEME:
      localStorage.setItem('theme', payload.theme);
      return {
        ...state,
        account: { ...payload }
      };

    default:
      return state;
  }
};
