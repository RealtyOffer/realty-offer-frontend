import React from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';

// eslint-disable-next-line no-underscore-dangle
const initialState = process.env.BROWSER ? window.__INITIAL_STATE__ : {};
const { store, persistor } = configureStore(initialState);

export default ({ element }: { element: any}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
);
