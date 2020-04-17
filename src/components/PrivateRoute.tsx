import React, { ComponentType, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { RouteComponentProps, WindowLocation } from '@reach/router';

import { AuthStoreType } from '../redux/ducks/auth.d';
import { RootState } from '../redux/ducks';

type AllowedRoleType = 'Agent' | 'Consumer' | 'Admin';

type PrivateRouteProps = {
  auth?: AuthStoreType;
  location?: WindowLocation;
  component: ComponentType & RouteComponentProps;
  path: string;
  allowedRole: AllowedRoleType;
};

const isRoleAllowed = (roles: string, allowedRole: AllowedRoleType) => roles.includes(allowedRole);

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  auth,
  allowedRole,
  component: Component,
  location,
  ...rest
}) => {
  if (
    auth &&
    !auth.isLoggedIn &&
    location &&
    location.pathname !== '/login' &&
    isRoleAllowed(auth.roles, allowedRole)
  ) {
    navigate('/login');
    return null;
  }
  return <Component {...rest} location={location} />;
};

export default connect(
  (state: RootState) => ({
    auth: state.auth,
  }),
  null
)(PrivateRoute);
