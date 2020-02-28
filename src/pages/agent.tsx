import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';

import Agent from '../views/agent/Agent';
import CreateAgent from '../views/agent/AgentCreation/CreateAgent';
import VerifyEmail from '../views/agent/AgentCreation/VerifyEmail';
import AgentInformation from '../views/agent/AgentCreation/AgentInformation';
import BusinessInformation from '../views/agent/AgentCreation/BusinessInformation';
import PaymentInformation from '../views/agent/AgentCreation/PaymentInformation';
import ConfirmPayment from '../views/agent/AgentCreation/ConfirmPayment';
import NotFoundPage from './404';
import { Layout } from '../components';

const App = () => (
  <Layout>
    <Router basepath="agent">
      <Agent path="/" />
      <CreateAgent path="/create-agent" />
      <VerifyEmail path="/verify-email" />
      <AgentInformation path="/agent-information" />
      <BusinessInformation path="/business-information" />
      <PaymentInformation path="/payment-information" />
      <ConfirmPayment path="/confirm-payment" />
      <NotFoundPage default />
    </Router>
  </Layout>
);

export default App;
