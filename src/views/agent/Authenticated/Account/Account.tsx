import React, { FunctionComponent } from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Profile from './Profile';
import Settings from './Settings';
import Security from './Security';
import Notifications from './Notifications';
import { Row, Column, SubNav } from '../../../../components';
import { agentAccountNavigationitems } from '../../../../utils/agentNavigationItems';

type AgentSettingsProps = {} & RouteComponentProps;

const AgentSettings: FunctionComponent<AgentSettingsProps> = () => (
  <Row>
    <Column sm={3}>
      <SubNav items={agentAccountNavigationitems} />
    </Column>
    <Column sm={9}>
      <Router>
        <Profile path="/profile" />
        <Settings path="/settings" />
        <Security path="/security" />
        <Notifications path="/notifications" />
      </Router>
    </Column>
  </Row>
);

export default AgentSettings;
