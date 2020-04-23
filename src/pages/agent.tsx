import React, { useEffect, FunctionComponent } from 'react';
import { Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import Agent from '../views/agent/Agent';
import CreateAgent from '../views/agent/AgentCreation/CreateAgent';
import VerifyEmail from '../views/shared/VerifyEmail';
import AgentInformation from '../views/agent/AgentCreation/AgentInformation';
import BusinessInformation from '../views/agent/AgentCreation/BusinessInformation';
import PaymentInformation from '../views/agent/AgentCreation/PaymentInformation';
import ConfirmPayment from '../views/agent/AgentCreation/ConfirmPayment';
import NewListings from '../views/agent/Authenticated/Listings/New';
import PendingListings from '../views/agent/Authenticated/Listings/Pending';
import AwardedListings from '../views/agent/Authenticated/Listings/Awarded';
import ListingHistory from '../views/agent/Authenticated/Listings/History';
import ListingDetail from '../views/agent/Authenticated/Listings/Detail';
import AgentAccount from '../views/agent/Authenticated/Account/Account';
import NotFoundPage from './404';

import { PageContainer, PrivateRoute } from '../components';
import { getAgentSiteBanners, getAgentProfile } from '../redux/ducks/agent';
import { RootState } from '../redux/ducks';
import { addAlert } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';

const AgentApp: FunctionComponent<{}> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const banners = useSelector((state: RootState) => state.agent.banners);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);
  useEffect(() => {
    if (isLoggedIn && !prevBanners) {
      dispatch(getAgentSiteBanners());
      dispatch(getAgentProfile());
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
      <Router basepath="agent">
        <Agent path="/" />
        <CreateAgent path="/sign-up" />
        <VerifyEmail path="/verify-email" />
        <AgentInformation path="/agent-information" />
        <BusinessInformation path="/business-information" />
        <PaymentInformation path="/payment-information" />
        <ConfirmPayment path="/confirm-payment" />
        <PrivateRoute component={ListingDetail} path="/listings/:listingId" allowedRole="Agent" />
        <PrivateRoute component={NewListings} path="/listings/new" allowedRole="Agent" />
        <PrivateRoute component={PendingListings} path="/listings/pending" allowedRole="Agent" />
        <PrivateRoute component={AwardedListings} path="/listings/awarded" allowedRole="Agent" />
        <PrivateRoute component={ListingHistory} path="/listings/history" allowedRole="Agent" />
        <PrivateRoute component={AgentAccount} path="/account/*" allowedRole="Agent" />
        <NotFoundPage default />
      </Router>
    </PageContainer>
  );
};

export default AgentApp;
