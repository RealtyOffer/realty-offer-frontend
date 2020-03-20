import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';

import Agent from '../views/agent/Agent';
import CreateAgent from '../views/agent/AgentCreation/CreateAgent';
import VerifyEmail from '../views/shared/VerifyEmail';
import AgentInformation from '../views/agent/AgentCreation/AgentInformation';
import BusinessInformation from '../views/agent/AgentCreation/BusinessInformation';
import PaymentInformation from '../views/agent/AgentCreation/PaymentInformation';
import ConfirmPayment from '../views/agent/AgentCreation/ConfirmPayment';
import NewListings from '../views/agent/Authenticated/Listings/New';
import AgentProfile from '../views/agent/Authenticated/Account/Profile';
import NotFoundPage from './404';

import { PrivateRoute } from '../components';

const AgentApp: FunctionComponent<{}> = () => (
  <Router basepath="agent">
    <Agent path="/" />
    <CreateAgent path="/sign-up" />
    <VerifyEmail path="/verify-email" />
    <AgentInformation path="/agent-information" />
    <BusinessInformation path="/business-information" />
    <PaymentInformation path="/payment-information" />
    <ConfirmPayment path="/confirm-payment" />
    <PrivateRoute
      component={NewListings}
      auth={{ isLoggedIn: false } as any}
      location={null}
      path="/listings/new"
    />
    <PrivateRoute
      component={AgentProfile as any}
      auth={{ isLoggedIn: false } as any}
      location={null}
      path="/account/profile"
    />
    <NotFoundPage default />
  </Router>
);

export default AgentApp;
