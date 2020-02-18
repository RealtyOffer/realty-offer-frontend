import React, { Component } from 'react';
import { navigate } from 'gatsby';

type PrivateRouteProps = {
  component: Component;
  location: {
    pathname: string,
  };
  isLoggedIn: boolean;
}

const PrivateRoute = ({
  component, location, isLoggedIn, ...rest
}: PrivateRouteProps) => {
  if (!isLoggedIn && location.pathname !== '/app/login') {
    navigate('/app/login');
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
