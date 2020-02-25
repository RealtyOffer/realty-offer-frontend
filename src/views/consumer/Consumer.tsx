import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

import { Header } from '../../components';

const Consumer: FunctionComponent = () => (
  <>
    <Header>Consumer</Header>
    <Link to="/consumer/create-consumer">Create consumer</Link>
  </>
);

export default Consumer;
