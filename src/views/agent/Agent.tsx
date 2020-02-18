import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';

const Agent: FunctionComponent = () => (
  <>
  <h1>Hi!</h1>
  <Link to="/agent/create-agent">Create agent</Link>
  </>
);

export default Agent;
