import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Link } from 'gatsby';

import { Heading } from '../../components';

const Agent: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Heading>Agent</Heading>
    <p><Link to="/agent/create">Create agent</Link></p>
    <p><Link to="/agent/verify-email">Verify Email</Link></p>
    <p><Link to="/agent/agent-information">Agent Information</Link></p>
    <p><Link to="/agent/business-information">Business Information</Link></p>
    <p><Link to="/agent/payment-information">Payment Information</Link></p>
    <p><Link to="/agent/confirm-payment">Confirm Payment</Link></p>
  </>
);

export default Agent;
