import { combineReducers } from 'redux'

import auth from './auth'
import consumer from './consumer'
import globalAlerts from './globalAlerts'

const rootReducer: Function = combineReducers({
  auth,
  consumer,
  globalAlerts,
})

export default rootReducer
