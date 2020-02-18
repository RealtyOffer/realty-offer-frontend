import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';

import CreateConsumer from '../views/consumer/CreateConsumer';
import Consumer from '../views/consumer/Consumer';
import NotFoundPage from './404';
import { Layout } from '../components';

const App = () => (
  <Layout>
    <Router basepath="consumer">
      <Consumer path="/" />
      <CreateConsumer path="create-consumer" />
      <NotFoundPage default />
    </Router>
  </Layout>
);

export default App;
