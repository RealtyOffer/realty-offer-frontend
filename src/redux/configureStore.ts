/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Note: imported 'isomorphic-fetch' this way so that in reducer tests we can mock Fetch/Response
import 'isomorphic-fetch';

import rootReducer from './ducks/index';
import logger from './middleware/logger';
import oauth from './middleware/oauth';
import errorCatcher from './middleware/errorCatcher';

export const getMiddlewares = () => [oauth, apiMiddleware, errorCatcher, thunk];

const middlewares = getMiddlewares();
const isBrowser = typeof window !== 'undefined';

// eslint-disable-next-line
if (isBrowser && (window.__ENVIRONMENT || process.env.NODE_ENV !== 'production')) {
  middlewares.push(logger);
}

const functionsToCompose = [
  applyMiddleware(...middlewares),
];

// eslint-disable-next-line
if (isBrowser && (window.__ENVIRONMENT || process.env.NODE_ENV !== 'production')) {
  functionsToCompose.push((typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ?
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    (f: any) => f);
}

const makeConfiguredStore = (reducer: any, initialState: any) => {
  const persistConfig = {
    key: 'realty-offer',
    storage,
    whitelist: ['auth', 'consumer'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return createStore(
    persistedReducer,
    initialState,
    compose(...functionsToCompose),
  );
};

const configureStore = (
  initialState: any = {},
) => {
  const store = { ...makeConfiguredStore(rootReducer, initialState) };
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
