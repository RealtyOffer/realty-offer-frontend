import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

const Consumer: FunctionComponent = () => (
  <>
    <h1>Hi!</h1>
    <Link to="/consumer/create-consumer">Create consumer</Link>
  </>
);

export default Consumer;
