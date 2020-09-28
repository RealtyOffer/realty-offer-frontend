import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';
import { initialState as adminInitialState } from './ducks/admin';
import { initialState as authInitialState } from './ducks/auth';
import { initialState as agentInitialState } from './ducks/agent';
import { initialState as consumerInitialState } from './ducks/consumer';
import { initialState as dropdownsInitialState } from './ducks/dropdowns';
import { initialState as fortisInitialState } from './ducks/fortis';
import { initialState as globalAlertsInitialState } from './ducks/globalAlerts';
import { initialState as listingsInitialState } from './ducks/listings';
import { initialState as userInitialState } from './ducks/user';

export const initialState = process.env.BROWSER // eslint-disable-next-line no-underscore-dangle
  ? window.__INITIAL_STATE__
  : {
      admin: adminInitialState,
      auth: authInitialState,
      agent: agentInitialState,
      consumer: consumerInitialState,
      dropdowns: dropdownsInitialState,
      fortis: fortisInitialState,
      globalAlerts: globalAlertsInitialState,
      listings: listingsInitialState,
      user: userInitialState,
    };
const { store, persistor } = configureStore(initialState);

const ReduxWrapper: FunctionComponent<{ element: any }> = ({ element }) => (
  <Provider store={store}>
    {process.env.BROWSER ? (
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    ) : (
      element
    )}
  </Provider>
);

export default ReduxWrapper;
