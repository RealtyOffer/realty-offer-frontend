import { combineReducers } from 'redux';

import auth from './auth';
import globalAlerts from './globalAlerts';

const rootReducer: Function = combineReducers({
  auth,
  globalAlerts,
});

export default rootReducer;
