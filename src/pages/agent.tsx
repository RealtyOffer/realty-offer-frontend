import React, { useEffect, FunctionComponent } from 'react';
import { Router, WindowLocation } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import isPast from 'date-fns/isPast';
import { navigate } from 'gatsby';

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
import NewListingDetails from '../views/agent/Authenticated/Listings/NewListingDetails';
import PendingListingDetails from '../views/agent/Authenticated/Listings/PendingListingDetails';
import AgentAccount from '../views/agent/Authenticated/Account/Account';
import NotFoundPage from './404';

import { Alert, PageContainer, PrivateRoute } from '../components';
import { getAgentProfile, resetProfileCompleteAlert } from '../redux/ducks/agent';
import { getUserSiteBanners, getUserAvatar } from '../redux/ducks/user';
import { RootState } from '../redux/ducks';
import { ActionResponseType } from '../redux/constants';
import { addBanner } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';

const AgentApp: FunctionComponent<{ location: WindowLocation }> = (props) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const banners = useSelector((state: RootState) => state.user.banners);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);

  useEffect(() => {
    if (isLoggedIn && !agent.agentId && !agent.isLoading) {
      if (props.location.pathname === '/agent') {
        // if we are landing on the /agent page from logging in, redirect to new listings
        // otherwise, its a page refresh while logged in and we dont want to redirect
        navigate('/agent/listings/new');
      }
      dispatch(getUserAvatar());
      dispatch(getAgentProfile()).then((response: ActionResponseType) => {
        if (!response.payload.agentId) {
          navigate('/agent/agent-information');
        } else if (response.payload.cities.length === 0) {
          navigate('/agent/business-information');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !prevBanners) {
      dispatch(getUserSiteBanners('agent'));
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

  return (
    <PageContainer>
      {true &&
      agent.profileCompleteResetDate &&
      isPast(agent.profileCompleteResetDate) && ( // TODO: once we have languages/gender/bio/certification fields, hook this up
          <Alert
            type="info"
            message="Increase your chances of matching with potential clients by updating your profile with additional information."
            callToActionLink="/agent/account/profile"
            callToActionLinkText="Update Profile"
            dismissable
            close={() => dispatch(resetProfileCompleteAlert())}
          />
        )}

      <Router basepath="agent">
        <CreateAgent path="/sign-up" />
        <VerifyEmail path="/verify-email" />
        <AgentInformation path="/agent-information" />
        <BusinessInformation path="/business-information" />
        <PaymentInformation path="/payment-information" />
        <ConfirmPayment path="/confirm-payment" />
        <PrivateRoute
          component={NewListingDetails}
          path="/listings/new/:listingId"
          allowedRole="Agent"
        />
        <PrivateRoute
          component={PendingListingDetails}
          path="/listings/pending/:listingId"
          allowedRole="Agent"
        />
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
