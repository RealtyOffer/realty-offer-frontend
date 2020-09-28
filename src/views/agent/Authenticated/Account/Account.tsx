import React, { FunctionComponent } from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Profile from './Profile';
import Settings from './Settings';
import Security from './Security';
import Notifications from './Notifications';
import Billing from './Billing';
import { Row, Column, SubNav } from '../../../../components';
import { agentAccountNavigationitems } from '../../../../utils/agentNavigationItems';

type AgentSettingsProps = {} & RouteComponentProps;

const AgentSettings: FunctionComponent<AgentSettingsProps> = () => (
  <Row>
    <Column md={3}>
      <SubNav items={agentAccountNavigationitems} />
    </Column>
    <Column md={9}>
      <Router>
        <Profile path="/profile" />
        <Settings path="/settings" />
        <Security path="/security" />
        <Billing path="/billing" />
        <Notifications path="/notifications" />
      </Router>
    </Column>
  </Row>
);

export default AgentSettings;
