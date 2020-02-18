import React from 'react';
import { Provider } from 'react-redux';
// import { createStore as reduxCreateStore } from 'redux';
// import rootReducer from './ducks';

import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';
import { Layout } from '../components';

const initialState = process.env.BROWSER ? window.__INITIAL_STATE__ : {};
const { store, persistor } = configureStore(initialState);

export default ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout>
        {element}
      </Layout>
    </PersistGate>
  </Provider>
);
