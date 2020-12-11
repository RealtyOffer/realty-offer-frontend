import React, { ComponentType, FunctionComponent, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, WindowLocation } from '@reach/router';

import { RootState } from '../redux/ducks';
import { addAlert } from '../redux/ducks/globalAlerts';
import { addAttemptedPrivatePage } from '../redux/ducks/user';

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
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.isLoading && !auth.isLoggedIn) {
      if (location) {
        dispatch(addAttemptedPrivatePage(location.pathname));
      }
      navigate('/login');
      dispatch(
        addAlert({
          type: 'danger',
          message: 'Please log in to access that page',
        })
      );
    }
  }, []);

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
  if (auth && auth.isLoggedIn && !isRoleAllowed(auth.roles, allowedRole)) {
    navigate('/');
    dispatch(
      addAlert({
        type: 'danger',
        message: 'You do not have access to that page.',
      })
    );
    return null;
  }
  return <Component {...rest} />;
};

export default PrivateRoute;
