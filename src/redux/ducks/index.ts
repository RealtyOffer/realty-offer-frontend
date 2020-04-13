import { combineReducers } from 'redux';

import agent from './agent';
import auth from './auth';
import consumer from './consumer';
import globalAlerts from './globalAlerts';
import listings from './listings';

const rootReducer = combineReducers({
  agent,
  auth,
  consumer,
  globalAlerts,
  listings,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
