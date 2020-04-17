import React, { FunctionComponent } from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Banners from './Banners';
import { Column, Row, SubNav, Heading } from '../../components';
import adminNavigationitems from '../../utils/adminNavigationItems';

const Admin: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Heading>Admin</Heading>
    <Row>
      <Column sm={3}>
        <SubNav items={adminNavigationitems} />
      </Column>
      <Column sm={9}>
        <Router>
          <Banners path="/banners/*" />
        </Router>
      </Column>
    </Row>
  </>
);

export default Admin;
