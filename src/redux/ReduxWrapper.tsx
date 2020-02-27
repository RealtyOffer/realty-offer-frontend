import React from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';

const initialState = process.env.BROWSER ? window.__INITIAL_STATE__ : {};
const { store, persistor } = configureStore(initialState);

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);
