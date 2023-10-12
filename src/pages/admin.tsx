import React, { FunctionComponent, useEffect } from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import { PageContainer, Box, Column, Row, SubNav, Heading, PrivateRoute } from '../components';
import adminNavigationitems from '../utils/adminNavigationItems';

import Banners from '../views/admin/Banners';
import BannerDetails from '../views/admin/BannerDetails';
import Cities from '../views/admin/Cities';
import CityDetails from '../views/admin/CityDetails';
import Counties from '../views/admin/Counties';
import CountyDetails from '../views/admin/CountyDetails';
import EmailTemplates from '../views/admin/EmailTemplates';
import EmailTemplateDetails from '../views/admin/EmailTemplateDetails';
import Reports from '../views/admin/Reports';
import NotFoundPage from './404';
import { RootState } from '../redux/ducks';
import { getAgentProfile } from '../redux/ducks/agent';
import { getUserAvatar } from '../redux/ducks/user';

const AdminApp: FunctionComponent<{}> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn && !agent.agentId && !agent.isLoading) {
      dispatch(getAgentProfile());
      dispatch(getUserAvatar());
    }
  }, []);

  return (
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
              <PrivateRoute
                component={EmailTemplates}
                path="/email-templates"
                allowedRole="Admin"
              />
              <PrivateRoute
                component={EmailTemplateDetails}
                path="/email-templates/:name"
                allowedRole="Admin"
              />
              <PrivateRoute component={Reports} path="/reports" allowedRole="Admin" />
              <PrivateRoute component={NotFoundPage} path="/" allowedRole="Admin" />
            </Router>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  );
};
export default AdminApp;
