import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { Heading } from '../../components';

const Consumer: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Heading>Consumer</Heading>
    <Link to="/consumer/create-consumer">Create consumer</Link>
  </>
);

export default Consumer;
