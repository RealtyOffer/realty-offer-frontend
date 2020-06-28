import React, { ComponentType, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { useSelector } from 'react-redux';
import { RouteComponentProps, WindowLocation } from '@reach/router';

import { RootState } from '../redux/ducks';

type AllowedRoleType = 'Agent' | 'Consumer' | 'Admin';

type PrivateRouteProps = {
  location?: WindowLocation;
  component: ComponentType & RouteComponentProps;
  path: string;
  allowedRole: AllowedRoleType;
};

const isRoleAllowed = (roles: string, allowedRole: AllowedRoleType) => roles.includes(allowedRole);

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  allowedRole,
  component: Component,
  location,
  ...rest
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  if (
    auth &&
    !auth.isLoggedIn &&
    location &&
    location.pathname !== '/login' &&
    !isRoleAllowed(auth.roles, allowedRole)
  ) {
    navigate('/');
    return null;
  }
  return <Component {...rest} />;
};

export default PrivateRoute;
