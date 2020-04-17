import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';

import Admin from '../views/admin/Admin';
import NotFoundPage from './404';

import { PrivateRoute } from '../components';

const AdminApp: FunctionComponent<{}> = () => (
  <Router>
    <PrivateRoute component={Admin} path="/admin/*" allowedRole="Admin" />
    <NotFoundPage default />
  </Router>
);

export default AdminApp;
