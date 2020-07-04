import { combineReducers } from 'redux';

// Reducers
import alert from './alert';
import auth from './auth';
import app from './app';
import user from './user';
import promotions from './promotions';

export default combineReducers({
  alert,
  auth,
  app,
  user,
  promotions
});
