/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, FunctionComponent } from 'react';
import { Router, WindowLocation } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { navigate, Link } from 'gatsby';
import styled from 'styled-components';
import { FaBullhorn } from 'react-icons/fa';

import CreateAgent from '../views/agent/AgentCreation/CreateAgent';
import VerifyEmail from '../views/shared/VerifyEmail';
import AgentInformation from '../views/agent/AgentCreation/AgentInformation';
import BusinessInformation from '../views/agent/AgentCreation/BusinessInformation';
import PaymentInformation from '../views/agent/AgentCreation/PaymentInformation';
import ConfirmRegistration from '../views/agent/AgentCreation/ConfirmRegistration';
import NewListings from '../views/agent/Authenticated/Listings/New';
import PendingListings from '../views/agent/Authenticated/Listings/Pending';
import AwardedListings from '../views/agent/Authenticated/Listings/Awarded';
import ListingHistory from '../views/agent/Authenticated/Listings/History';
import ListingDetails from '../views/agent/Authenticated/Listings/ListingDetails';
import AgentAccount from '../views/agent/Authenticated/Account/Account';
import NotFoundPage from './404';

import { ErrorBoundary, PageContainer, PrivateRoute, LoadingPage } from '../components';
import { getAgentProfile, updateAgentIsInGoodStanding } from '../redux/ducks/agent';
import { logout } from '../redux/ducks/auth';
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
import { white, brandSuccess } from '../styles/color';
import { z1Shadow } from '../styles/mixins';
import {
  quadrupleSpacer,
  baseAndAHalfSpacer,
  octupleSpacer,
  quarterSpacer,
  borderRadius,
} from '../styles/size';

const FeedbackLink = styled(Link)`
  position: fixed;
  z-index: 1;
  right: -${quadrupleSpacer};
  height: ${quadrupleSpacer};
  margin-top: -${baseAndAHalfSpacer}; /* half of above */
  top: 50%;
  width: ${octupleSpacer};
  background: ${brandSuccess};
  color: ${white};
  padding: ${quarterSpacer};
  box-shadow: ${z1Shadow};
  border-radius: ${borderRadius} ${borderRadius} 0 0;
  transform: rotate(-90deg);
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${white};
    opacity: 0.8;
    right: calc(-${quadrupleSpacer} + ${quarterSpacer});
  }
`;

const AgentApp: FunctionComponent<{ location: WindowLocation }> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const banners = useSelector((state: RootState) => state.user.banners);
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const prevBanners = usePrevious(banners);

  useEffect(() => {
    if (auth.isLoggedIn && !agent.isLoading) {
      if (props.location.pathname === '/agent') {
        // if we are landing on the /agent page from logging in, redirect to new listings
        // otherwise, its a page refresh while logged in and we dont want to redirect
        navigate('/agent/loading');
      }
      dispatch(getAgentProfile()).then((response: ActionResponseType) => {
        if (!response || !response.payload) {
          dispatch(logout());
        }
        if (response && !response.error && response.payload.agentId) {
          dispatch(getUserAvatar());
          dispatch(getUserNotificationSettings());
          dispatch(getNotificationTypes());
          dispatch(getUserNotificationSubscriptions());
          if (props.location.pathname === '/agent') {
            navigate('/agent/listings/new');
          }
        }
        if (!response?.payload?.agentId || !response?.payload?.fortispayContactId) {
          navigate('/agent/agent-information');
        } else if (
          response &&
          !response.payload?.cities?.length &&
          !response.payload?.fortispayAccountVaultId &&
          !response.payload?.isPilotUser
        ) {
          navigate('/agent/business-information');
        } else if (
          response &&
          response.payload?.cities?.length > 0 &&
          !response.payload?.fortispayRecurringId &&
          !response.payload?.isPilotUser
        ) {
          navigate('/agent/confirm-registration');
        } else if (props.location.pathname === '/agent') {
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
    if (auth.isLoggedIn && !agent.isPilotUser && !fortis.isLoading) {
      if (
        fortis.transactions &&
        fortis.transactions.length > 0 &&
        fortis.transactions.sort((a, b) => b.created_ts - a.created_ts)[0].status_id === 301 &&
        fortis.transactions.sort((a, b) => b.created_ts - a.created_ts)[0].transaction_amount !==
          '0.00'
      ) {
        dispatch(updateAgentIsInGoodStanding(false));
        dispatch(
          addBanner({
            message: 'Your last transaction was declined. Please visit the',
            type: 'danger',
            dismissable: true,
            callToActionLink: '/agent/account/billing/',
            callToActionLinkText: 'Billing page to update your payment method',
          })
        );
      } else {
        dispatch(updateAgentIsInGoodStanding(true));
      }
    }
  }, [fortis.isLoading]);

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
        <Router basepath="/agent">
          <LoadingPage path="/" />
          <LoadingPage path="/loading" />
          <CreateAgent path="/sign-up" />
          <VerifyEmail path="/verify-email" />
          <AgentInformation path="/agent-information" />
          <BusinessInformation path="/business-information" />
          <PaymentInformation path="/payment-information" />
          <ConfirmRegistration path="/confirm-registration" />
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
      {auth.isLoggedIn && (
        <FeedbackLink to="/feedback" state={{ pathname: props.location.pathname }}>
          <FaBullhorn /> Feedback
        </FeedbackLink>
      )}
    </PageContainer>
  );
};

export default AgentApp;
