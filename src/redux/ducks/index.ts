import { combineReducers } from 'redux';

import admin from './admin';
import agent from './agent';
import auth from './auth';
import consumer from './consumer';
import dropdowns from './dropdowns';
import fortis from './fortis';
import globalAlerts from './globalAlerts';
import listings from './listings';
import user from './user';

const rootReducer = combineReducers({
  admin,
  agent,
  auth,
  consumer,
  dropdowns,
  fortis,
  globalAlerts,
  listings,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
