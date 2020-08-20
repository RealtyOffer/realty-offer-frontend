import React, { useEffect, FunctionComponent } from 'react';
import { Router, navigate, WindowLocation } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import StartCreateConsumer from '../views/consumer/ConsumerCreation/StartCreateConsumer';
import Buying from '../views/consumer/ConsumerCreation/Buying';
import Selling from '../views/consumer/ConsumerCreation/Selling';
import CreateConsumer from '../views/consumer/ConsumerCreation/CreateConsumer';
import VerifyEmail from '../views/shared/VerifyEmail';
import Home from '../views/consumer/Authenticated/Home';
import NotFoundPage from './404';

import { LoadingPage, PageContainer, PrivateRoute } from '../components';
import { getUserSiteBanners } from '../redux/ducks/user';
import { RootState } from '../redux/ducks';
import { addBanner } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';

const ConsumerApp: FunctionComponent<{ location: WindowLocation }> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const banners = useSelector((state: RootState) => state.user.banners);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);
  useEffect(() => {
    if (isLoggedIn && !prevBanners) {
      dispatch(getUserSiteBanners('consumer'));
    }
    if (!isEqual(prevBanners, banners)) {
      if (banners) {
        banners.forEach((banner) => {
          dispatch(
            addBanner({
              message: banner.message,
              type: banner.styling,
              dismissable: banner.dismissable,
              callToActionLink: banner.callToActionLink,
              callToActionLinkText: banner.callToActionLinkText,
            })
          );
        });
      }
    }
  }, [banners]);

  useEffect(() => {
    if (!isLoggedIn && props.location.pathname === '/consumer') {
      navigate('/consumer/start');
    }
    if (isLoggedIn && props.location.pathname === '/consumer') {
      navigate('/consumer/listing');
    }
  }, []);

  return (
    <PageContainer>
      <Router basepath="/consumer">
        <LoadingPage path="/" />
        <StartCreateConsumer path="/start" />
        <Buying path="/buying" />
        <Selling path="/selling" />
        <CreateConsumer path="/sign-up" />
        <VerifyEmail path="/verify-email" />
        <PrivateRoute component={Home} path="/listing" allowedRole="Consumer" />
        <PrivateRoute component={Home} path="/profile" allowedRole="Consumer" />
        <PrivateRoute component={Home} path="/preferences" allowedRole="Consumer" />
        <PrivateRoute component={Home} path="/manage-notifications" allowedRole="Consumer" />
        <NotFoundPage default />
      </Router>
    </PageContainer>
  );
};

export default ConsumerApp;
