import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';

import { Box, Column, Row, SubNav, Heading, PrivateRoute } from '../components';
import adminNavigationitems from '../utils/adminNavigationItems';

import Banners from '../views/admin/Banners';
import BannerDetails from '../views/admin/BannerDetails';
import Cities from '../views/admin/Cities';
import CityDetails from '../views/admin/CityDetails';
import NotFoundPage from './404';

const AdminApp: FunctionComponent<{}> = () => (
  <>
    <Heading>Admin</Heading>
    <Row>
      <Column sm={3}>
        <SubNav items={adminNavigationitems} />
      </Column>
      <Column sm={9}>
        <Box>
          <Router basepath="admin">
            <PrivateRoute component={Banners} path="/banners" allowedRole="Admin" />
            <PrivateRoute component={BannerDetails} path="/banners/:id" allowedRole="Admin" />
            <PrivateRoute component={Cities} path="/cities" allowedRole="Admin" />
            <PrivateRoute component={CityDetails} path="/cities/:id" allowedRole="Admin" />
            <NotFoundPage default />
          </Router>
        </Box>
      </Column>
    </Row>
  </>
);

export default AdminApp;
