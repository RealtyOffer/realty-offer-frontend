import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Modal from 'react-modal';

import configureStore from './configureStore';
import { initialState as adminInitialState } from './ducks/admin';
import { initialState as authInitialState } from './ducks/auth';
import { initialState as agentInitialState } from './ducks/agent';
import { initialState as consumerInitialState } from './ducks/consumer';
import { initialState as globalAlertsInitialState } from './ducks/globalAlerts';
import { initialState as listingsInitialState } from './ducks/listings';

import { Layout } from '../components';

const initialState = process.env.BROWSER // eslint-disable-next-line no-underscore-dangle
  ? window.__INITIAL_STATE__
  : {
      admin: adminInitialState,
      auth: authInitialState,
      agent: agentInitialState,
      consumer: consumerInitialState,
      globalAlerts: globalAlertsInitialState,
      listings: listingsInitialState,
    };
const { store, persistor } = configureStore(initialState);

Modal.setAppElement('#___gatsby');
// eslint-disable-next-line react/display-name
export default ({ element }: { element: any }) => (
  <Provider store={store}>
    {process.env.BROWSER ? (
      <PersistGate loading={null} persistor={persistor}>
        <Layout>{element}</Layout>
      </PersistGate>
    ) : (
      <Layout>{element}</Layout>
    )}
  </Provider>
);
