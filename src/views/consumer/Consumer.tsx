import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { Heading } from '../../components';

const Consumer: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Heading>Consumer</Heading>
    <p><Link to="/consumer/start">Create consumer</Link></p>
    <p><Link to="/consumer/buying">Buying</Link></p>
    <p><Link to="/consumer/selling">Selling</Link></p>
    <p><Link to="/consumer/special-requests">Special Requests</Link></p>
    <p><Link to="/consumer/sign-up">Sign Up</Link></p>
  </>
);

export default Consumer;
