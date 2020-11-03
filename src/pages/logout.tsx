import React, { FunctionComponent, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

import { PageContainer, LoadingPage, Seo } from '../components';
import { logout } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';

type LogoutProps = {};

const Logout: FunctionComponent<LogoutProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(logout());
    }
    navigate('/');
  }, []);

  return (
    <PageContainer>
      <Seo title="Log Out" />
      <LoadingPage />
    </PageContainer>
  );
};

export default Logout;
