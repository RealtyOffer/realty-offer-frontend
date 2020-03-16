import React, { Component, FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';

import { AuthStoreType } from '../redux/ducks/auth';

type PrivateRouteProps = {
  auth: AuthStoreType;
  location: any;
  component: Component;
} & RouteComponentProps

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  auth, component: Component, location, ...rest
}) => {
  if (!auth.isLoggedIn && location.pathname !== '/login') {
    navigate('/login');
    return null;
  }
  return <Component {...rest} />;
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  null,
)(PrivateRoute);
