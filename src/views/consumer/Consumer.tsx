import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { Header } from '../../components';

const Consumer: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Header>Consumer</Header>
    <Link to="/consumer/create-consumer">Create consumer</Link>
  </>
);

export default Consumer;
