import React, { FunctionComponent } from 'react';
import { Router } from '@reach/router';

import { PageContainer, Box, Column, Row, SubNav, Heading, PrivateRoute } from '../components';
import adminNavigationitems from '../utils/adminNavigationItems';

import Banners from '../views/admin/Banners';
import BannerDetails from '../views/admin/BannerDetails';
import Cities from '../views/admin/Cities';
import CityDetails from '../views/admin/CityDetails';
import Counties from '../views/admin/Counties';
import CountyDetails from '../views/admin/CountyDetails';
import NotFoundPage from './404';

const AdminApp: FunctionComponent<{}> = () => (
  <PageContainer>
    <Heading>Admin</Heading>
    <Row>
      <Column md={3}>
        <SubNav items={adminNavigationitems} />
      </Column>
      <Column md={9}>
        <Box>
          <Router basepath="admin">
            <PrivateRoute component={Banners} path="/banners" allowedRole="Admin" />
            <PrivateRoute component={BannerDetails} path="/banners/:id" allowedRole="Admin" />
            <PrivateRoute component={Cities} path="/cities" allowedRole="Admin" />
            <PrivateRoute component={CityDetails} path="/cities/:id" allowedRole="Admin" />
            <PrivateRoute component={Counties} path="/counties" allowedRole="Admin" />
            <PrivateRoute component={CountyDetails} path="/counties/:id" allowedRole="Admin" />
            <NotFoundPage default />
          </Router>
        </Box>
      </Column>
    </Row>
  </PageContainer>
);

export default AdminApp;
