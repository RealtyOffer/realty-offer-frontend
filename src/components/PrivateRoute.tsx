import React, { ComponentType, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';

import { AuthStoreType } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';

type AllowedRoleType = 'Agent' | 'Consumer' | 'Admin';

type PrivateRouteProps = {
  auth?: AuthStoreType;
  location?: any;
  component: ComponentType;
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
    location.pathname !== '/login' &&
    isRoleAllowed(auth.roles, allowedRole)
  ) {
    navigate('/login');
    return null;
  }
  return <Component {...rest} />;
};

export default connect(
  (state: RootState) => ({
    auth: state.auth,
  }),
  null
)(PrivateRoute);
