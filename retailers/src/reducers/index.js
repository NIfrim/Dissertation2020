import { combineReducers } from 'redux';

// Reducers
import alert from './alert';
import companies from './companies';
import auth from './auth';
import app from './app';
import accessGroups from './accessGroups';
import stores from './stores';
import map from './map';
import products from './products';
import promotions from './promotions';

export default combineReducers({
  alert,
  companies,
  auth,
  app,
  accessGroups,
  stores,
  map,
  products,
  promotions
});
