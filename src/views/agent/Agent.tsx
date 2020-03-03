import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Link } from 'gatsby';

import { Header } from '../../components';

const Agent: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Header>Agent</Header>
    <p><Link to="/agent/create-agent">Create agent</Link></p>
    <p><Link to="/agent/verify-email">Verify Email</Link></p>
    <p><Link to="/agent/agent-information">Agent Information</Link></p>
    <p><Link to="/agent/business-information">Business Information</Link></p>
    <p><Link to="/agent/payment-information">Payment Information</Link></p>
    <p><Link to="/agent/confirm-payment">Confirm Payment</Link></p>
  </>
);

export default Agent;
