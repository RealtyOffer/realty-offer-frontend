import React from 'react';
import { Router } from '@reach/router';

import Consumer from '../views/consumer/Consumer';
import StartCreateConsumer from '../views/consumer/ConsumerCreation/StartCreateConsumer';
import Buying from '../views/consumer/ConsumerCreation/Buying';
import Selling from '../views/consumer/ConsumerCreation/Selling';
import SpecialRequests from '../views/consumer/ConsumerCreation/SpecialRequests';
import CreateConsumer from '../views/consumer/ConsumerCreation/CreateConsumer';
import VerifyEmail from '../views/shared/VerifyEmail';
import NotFoundPage from './404';

const ConsumerApp = () => (
  <Router basepath="consumer">
    <Consumer path="/" />
    <StartCreateConsumer path="/start" />
    <Buying path="/buying" />
    <Selling path="/selling" />
    <SpecialRequests path="/special-requests" />
    <CreateConsumer path="/sign-up" />
    <VerifyEmail path="/verify-email" />
    <NotFoundPage default />
  </Router>
);

export default ConsumerApp;
