import React, { useEffect, FunctionComponent } from 'react';
import { Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import Consumer from '../views/consumer/Consumer';
import StartCreateConsumer from '../views/consumer/ConsumerCreation/StartCreateConsumer';
import Buying from '../views/consumer/ConsumerCreation/Buying';
import Selling from '../views/consumer/ConsumerCreation/Selling';
import SpecialRequests from '../views/consumer/ConsumerCreation/SpecialRequests';
import CreateConsumer from '../views/consumer/ConsumerCreation/CreateConsumer';
import VerifyEmail from '../views/shared/VerifyEmail';
import NotFoundPage from './404';

import { PageContainer } from '../components';
import { getConsumerSiteBanners } from '../redux/ducks/consumer';
import { RootState } from '../redux/ducks';
import { addAlert } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';

const ConsumerApp: FunctionComponent<{}> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const banners = useSelector((state: RootState) => state.consumer.banners);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);
  useEffect(() => {
    if (isLoggedIn && !prevBanners) {
      dispatch(getConsumerSiteBanners());
    }
    if (!isEqual(prevBanners, banners)) {
      if (banners) {
        banners.forEach((banner) => {
          dispatch(
            addAlert({
              message: banner.message,
              type: banner.styling,
              dismissable: banner.dismissable,
            })
          );
        });
      }
    }
  }, [banners]);

  return (
    <PageContainer>
      <Router basepath="consumer">
        <Consumer path="/" />
        <StartCreateConsumer path="/start" />
        <Buying path="/buying" />
        <Selling path="/selling" />
        <SpecialRequests path="/special-requests" />
        <CreateConsumer path="/sign-up" />
        <VerifyEmail path="/verify-email" />
        <NotFoundPage default />
      </Router>
    </PageContainer>
  );
};

export default ConsumerApp;
