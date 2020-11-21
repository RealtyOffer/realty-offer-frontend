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
import MissingCity from '../views/shared/MissingCity';

import NotFoundPage from './404';
import { LoadingPage, PageContainer, PrivateRoute, ErrorBoundary } from '../components';
import { getUserSiteBanners } from '../redux/ducks/user';
import { RootState } from '../redux/ducks';
import { addBanner } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';

const ConsumerApp: FunctionComponent<{ location: WindowLocation }> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const banners = useSelector((state: RootState) => state.user.banners);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);
  useEffect(() => {
    if (auth.isLoggedIn && !prevBanners) {
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
    if (!auth.isLoggedIn && props.location.pathname === '/consumer') {
      navigate('/consumer/start');
    }
    if (auth.isLoggedIn && props.location.pathname === '/consumer') {
      navigate('/consumer/listing');
    }
  }, []);

  useEffect(() => {
    if (window && window.analytics && auth.isLoggedIn) {
      window.analytics.identify(auth.email, {
        email: auth.email,
        firstName: auth.firstName,
        lastName: auth.lastName,
      });
    }
  }, []);

  return (
    <PageContainer>
      <ErrorBoundary>
        <Router basepath="/consumer">
          <LoadingPage path="/" />
          <StartCreateConsumer path="/start" />
          <Buying path="/buying" />
          <Selling path="/selling" />
          <CreateConsumer path="/sign-up" />
          <VerifyEmail path="/verify-email" />
          <MissingCity path="/missing-city" />
          <PrivateRoute component={Home} path="/listing" allowedRole="Consumer" />
          <PrivateRoute component={Home} path="/profile" allowedRole="Consumer" />
          <PrivateRoute component={Home} path="/preferences" allowedRole="Consumer" />
          <PrivateRoute component={Home} path="/manage-notifications" allowedRole="Consumer" />
          <NotFoundPage default />
        </Router>
      </ErrorBoundary>
    </PageContainer>
  );
};

export default ConsumerApp;
