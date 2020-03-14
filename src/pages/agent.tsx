import React from 'react';
import { Router, Redirect } from '@reach/router';
import { connect } from 'react-redux';

import Agent from '../views/agent/Agent';
import CreateAgent from '../views/agent/AgentCreation/CreateAgent';
import VerifyEmail from '../views/agent/AgentCreation/VerifyEmail';
import AgentInformation from '../views/agent/AgentCreation/AgentInformation';
import BusinessInformation from '../views/agent/AgentCreation/BusinessInformation';
import PaymentInformation from '../views/agent/AgentCreation/PaymentInformation';
import ConfirmPayment from '../views/agent/AgentCreation/ConfirmPayment';
import NewListings from '../views/agent/Authenticated/Listings/New';
import NotFoundPage from './404';

type AgentAppProps = {
  auth: {
    isLoggedIn: boolean;
  };
}

const AgentApp = (props: AgentAppProps) => (
  <Router basepath="agent">
    <Agent path="/" />
    <CreateAgent path="/sign-up" />
    <VerifyEmail path="/verify-email" />
    <AgentInformation path="/agent-information" />
    <BusinessInformation path="/business-information" />
    <PaymentInformation path="/payment-information" />
    <ConfirmPayment path="/confirm-payment" />
    {
      props.auth.isLoggedIn && (
        <>
          <NewListings path="/listings/new" />
        </>
      )
    }
    {/*
      TODO: reimplement PrivateRoute to push people to / when logging out so we dont have to keep
      updating this list
    */}
    <Redirect from="/listings/*" to="/" />
    <NotFoundPage default />
  </Router>
);

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  null,
)(AgentApp);
