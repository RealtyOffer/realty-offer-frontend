import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';

import Admin from '../views/admin/Admin';
import NotFoundPage from './404';

import { PrivateRoute } from '../components';

const AgentApp: FunctionComponent<{}> = () => (
  <Router basepath="admin">
    <PrivateRoute path="/" component={Admin} allowedRole="Admin" />
    <NotFoundPage default />
  </Router>
);

export default AgentApp;
