import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';

import Agent from '../views/agent/Agent';
import CreateAgent from '../views/agent/CreateAgent';
import VerifyEmail from '../views/agent/VerifyEmail';
import NotFoundPage from './404';
import { Layout } from '../components';

const App = () => (
  <Layout>
    <Router basepath="agent">
      <Agent path="/" />
      <CreateAgent path="/create-agent" />
      <VerifyEmail path="/verify-email" />
      <NotFoundPage default />
    </Router>
  </Layout>
);

export default App;
