/* eslint-disable @typescript-eslint/camelcase */
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
import ListingDetails from '../views/agent/Authenticated/Listings/ListingDetails';
import AgentAccount from '../views/agent/Authenticated/Account/Account';
import NotFoundPage from './404';

import { ErrorBoundary, Alert, PageContainer, PrivateRoute, LoadingPage } from '../components';
import {
  getAgentProfile,
  resetProfileCompleteAlert,
  updateAgentIsInGoodStanding,
} from '../redux/ducks/agent';
import {
  getUserSiteBanners,
  getUserAvatar,
  getUserNotificationSettings,
  getNotificationTypes,
  getUserNotificationSubscriptions,
} from '../redux/ducks/user';
import { RootState } from '../redux/ducks';
import { ActionResponseType } from '../redux/constants';
import { addBanner } from '../redux/ducks/globalAlerts';
import usePrevious from '../utils/usePrevious';
import { getPriceRangesList } from '../redux/ducks/dropdowns';
import {
  getFortispayAccountvaults,
  getFortispayRecurrings,
  getFortispayTransactions,
} from '../redux/ducks/fortis';

const AgentApp: FunctionComponent<{ location: WindowLocation }> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const banners = useSelector((state: RootState) => state.user.banners);
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);

  useEffect(() => {
    if (auth.isLoggedIn && !agent.agentId && !agent.isLoading) {
      if (props.location.pathname === '/agent') {
        // if we are landing on the /agent page from logging in, redirect to new listings
        // otherwise, its a page refresh while logged in and we dont want to redirect
        navigate('/agent/loading');
      }
      dispatch(getAgentProfile()).then((response: ActionResponseType) => {
        if (response && !response.error && response.payload.agentId) {
          dispatch(getUserAvatar());
          dispatch(getUserNotificationSettings());
          dispatch(getNotificationTypes());
          dispatch(getUserNotificationSubscriptions());
          if (props.location.pathname === '/agent') {
            navigate('/agent/listings/new');
          }
        }
        if (!response.payload.agentId) {
          navigate('/agent/agent-information');
        }
        // TODO: uncomment after Pilot/Beta
        // else if (response.payload.cities.length === 0) {
        //   navigate('/agent/business-information');
        // }
        // else if (!response.payload.fortispayAccountVaultId) {
        //   navigate('/agent/payment-information');
        // }
        // else if (!response.payload.fortispayRecurringId) {
        //   navigate('/agent/confirm-payment');
        // }
        else if (props.location.pathname === '/agent') {
          navigate('/agent/listings/new');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (auth.isLoggedIn && agent.fortispayContactId != null) {
      dispatch(getFortispayAccountvaults({ contact_id: agent.fortispayContactId }));
      dispatch(getFortispayTransactions({ contact_id: agent.fortispayContactId }));
      dispatch(getFortispayRecurrings({ contact_id: agent.fortispayContactId }));
    }
  }, [agent.fortispayContactId, agent.fortispayRecurringId]);

  useEffect(() => {
    if (auth.isLoggedIn && fortis.transactions && fortis.transactions.length > 0) {
      if (fortis.transactions.sort((a, b) => b.created_ts - a.created_ts)[0].status_id === 301) {
        dispatch(updateAgentIsInGoodStanding(false));
        dispatch(
          addBanner({
            message: 'Your last transaction was declined. Please visit the',
            type: 'danger',
            dismissable: false,
            callToActionLink: '/agent/account/billing',
            callToActionLinkText: 'Billing page to update your payment method',
          })
        );
      } else {
        dispatch(updateAgentIsInGoodStanding(true));
      }
    }
  }, [fortis.transactions]);

  useEffect(() => {
    if (auth.isLoggedIn && !prevBanners) {
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

  useEffect(() => {
    if (!dropdowns.priceRanges.list.length) {
      dispatch(getPriceRangesList());
    }
  }, []);

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
      <ErrorBoundary>
        <Router basepath="/agent">
          <LoadingPage path="/" />
          <LoadingPage path="/loading" />
          <CreateAgent path="/sign-up" />
          <CreateAgent path="/pilot" />
          <VerifyEmail path="/verify-email" />
          <AgentInformation path="/agent-information" />
          <BusinessInformation path="/business-information" />
          <PaymentInformation path="/payment-information" />
          <ConfirmPayment path="/confirm-payment" />
          <PrivateRoute
            component={ListingDetails}
            path="/listings/new/:listingId"
            allowedRole="Agent"
          />
          <PrivateRoute
            component={ListingDetails}
            path="/listings/pending/:listingId"
            allowedRole="Agent"
          />
          <PrivateRoute
            component={ListingDetails}
            path="/listings/awarded/:listingId"
            allowedRole="Agent"
          />
          <PrivateRoute
            component={ListingDetails}
            path="/listings/history/:listingId"
            allowedRole="Agent"
          />
          <PrivateRoute component={NewListings} path="/listings/new" allowedRole="Agent" />
          <PrivateRoute component={PendingListings} path="/listings/pending" allowedRole="Agent" />
          <PrivateRoute component={AwardedListings} path="/listings/awarded" allowedRole="Agent" />
          <PrivateRoute component={ListingHistory} path="/listings/history" allowedRole="Agent" />
          <PrivateRoute component={AgentAccount} path="/account/*" allowedRole="Agent" />
          <NotFoundPage default />
        </Router>
      </ErrorBoundary>
    </PageContainer>
  );
};

export default AgentApp;
