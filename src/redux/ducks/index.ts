import { combineReducers } from 'redux';

import auth from './auth';

const rootReducer: Function = combineReducers({
  auth,
});

export default rootReducer;
