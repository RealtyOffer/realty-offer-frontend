import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import admin from './admin';
import agent from './agent';
import auth from './auth';
import consumer from './consumer';
import dropdowns from './dropdowns';
import fortis from './fortis';
import globalAlerts from './globalAlerts';
import listings from './listings';
import user from './user';

// Whitelist the hidden ID array to keep listings hidden on refresh
const listingConfig = {
  key: 'listings',
  storage,
  whitelist: ['hiddenListingIds'],
};

const rootReducer = combineReducers({
  admin,
  agent,
  auth,
  consumer,
  dropdowns,
  fortis,
  globalAlerts,
  listings: persistReducer(listingConfig, listings),
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
