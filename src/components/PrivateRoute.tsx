import React, { ComponentType, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';

import { AuthStoreType } from '../redux/ducks/auth';

type PrivateRouteProps = {
  auth?: AuthStoreType;
  location?: any;
  component: ComponentType;
  path: string;
};

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  auth,
  component: Component,
  location,
  ...rest
}) => {
  if (auth && !auth.isLoggedIn && location.pathname !== '/login') {
    navigate('/login');
    return null;
  }
  return <Component {...rest} />;
};

export default connect(
  (state) => ({
    auth: (state as any).auth,
  }),
  null
)(PrivateRoute);
