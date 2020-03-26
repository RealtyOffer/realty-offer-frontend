import React, { FunctionComponent } from 'react';
import { Router, RouteComponentProps } from '@reach/router';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Profile from './Profile';
import Settings from './Settings';
import Security from './Security';
import { Row, Column } from '../../../../components';
import { baseBorderStyle, z1Shadow } from '../../../../styles/mixins';
import { baseSpacer } from '../../../../styles/size';
import { white, offWhite } from '../../../../styles/color';

const StyledSubNav = styled.nav`
  background-color: ${white};
  border: ${baseBorderStyle};
  box-shadow: ${z1Shadow};
`;

const StyledSubNavLink = styled(Link)`
  border-bottom: ${baseBorderStyle};
  display: block;
  padding: ${baseSpacer};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${offWhite};
  }
`;

type AgentSettingsProps = {} & RouteComponentProps;

const AgentSettings: FunctionComponent<AgentSettingsProps> = () => (
  <Row>
    <Column sm={3}>
      <StyledSubNav aria-label="Account Settings">
        <StyledSubNavLink to="/agent/account/profile">Profile</StyledSubNavLink>
        <StyledSubNavLink to="/agent/account/security">Security</StyledSubNavLink>
        <StyledSubNavLink to="/agent/account/settings">Settings</StyledSubNavLink>
        <StyledSubNavLink to="/agent/account/notifications">Notifications</StyledSubNavLink>
      </StyledSubNav>
    </Column>
    <Column sm={9}>
      <Router>
        <Profile path="/profile" />
        <Settings path="/settings" />
        <Security path="/security" />
      </Router>
    </Column>
  </Row>
);

export default AgentSettings;
