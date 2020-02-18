import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';

import CreateAgent from '../views/agent/CreateAgent';
import Agent from '../views/agent/Agent';
import NotFoundPage from './404';
import { Layout } from '../components';

const App = () => (
  <Layout>
    <Router basepath="agent">
      <Agent path="/" />
      <CreateAgent path="/create-agent" />
      <NotFoundPage default />
    </Router>
  </Layout>
);

export default App;
