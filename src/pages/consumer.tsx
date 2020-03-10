import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';

import CreateConsumer from '../views/consumer/ConsumerCreation/CreateConsumer';
import Consumer from '../views/consumer/Consumer';
import NotFoundPage from './404';

const ConsumerApp = () => (
  <Router basepath="consumer">
    <Consumer path="/" />
    <CreateConsumer path="create-consumer" />
    <NotFoundPage default />
  </Router>
);

export default ConsumerApp;
