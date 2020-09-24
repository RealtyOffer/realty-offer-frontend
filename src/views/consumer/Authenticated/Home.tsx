import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

import {
  FlexContainer,
  Heading,
  Seo,
  HorizontalRule,
  Row,
  Column,
  SubNav,
  PrivateRoute,
  Box,
  GetFinancedForm,
} from '../../../components';
import {
  getConsumerProfile,
  getConsumerBids,
  getWinningAgentProfile,
  getWinningAgentProfilePhoto,
} from '../../../redux/ducks/consumer';
import { RootState } from '../../../redux/ducks';
import ConsumerNotifications from './ConsumerNotifications';
import ConsumerProfileDetails from './ConsumerProfileDetails';
import ConsumerListing from './ConsumerListing';
import ConsumerPreferences from './ConsumerPreferences';

import { baseSpacer, doubleSpacer, borderRadius } from '../../../styles/size';
import { brandTertiary, white } from '../../../styles/color';
import { isExpired } from '../../../utils/countdownTimerUtils';
import consumerNavigationItems from '../../../utils/consumerNavigationItems';
import { WinningAgentProfileType } from '../../../redux/ducks/consumer.d';
import {
  getUserNotificationSettings,
  getNotificationTypes,
  getUserNotificationSubscriptions,
} from '../../../redux/ducks/user';
import { getHomeTypesList, getPriceRangesList } from '../../../redux/ducks/dropdowns';

const StyledAlert = styled.div`
  padding: ${baseSpacer};
  background-color: ${brandTertiary};
  color: ${white};
  border-radius: ${borderRadius};
`;

const ConsumerHome: FunctionComponent<RouteComponentProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const consumer = useSelector((state: RootState) => state.consumer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConsumerProfile());
    dispatch(getPriceRangesList());
    dispatch(getHomeTypesList());
  }, []);

  useEffect(() => {
    if (consumer.listing && isExpired(consumer.listing.createDateTime) && !consumer.winner) {
      dispatch(getConsumerBids());
    }
  }, [consumer.listing]);

  useEffect(() => {
    if (
      consumer.listing &&
      consumer.bids.length > 0 &&
      isExpired(consumer.listing.createDateTime) &&
      !consumer.winner
    ) {
      dispatch(getWinningAgentProfile()).then((response: { payload: WinningAgentProfileType }) => {
        if (response.payload?.userName) {
          dispatch(getWinningAgentProfilePhoto(response.payload.userName));
        }
      });
    }
  }, [consumer.listing]);

  useEffect(() => {
    dispatch(getUserNotificationSettings());
    dispatch(getNotificationTypes());
    dispatch(getUserNotificationSubscriptions());
  }, []);

  return (
    <>
      <Seo title="Home" />
      <Heading>Congrats {auth.firstName}!</Heading>
      <p>Your listing has been sent to hundreds of our agents.</p>
      <StyledAlert>
        <FlexContainer justifyContent="space-between" flexWrap="nowrap" alignItems="start">
          <div>
            <FaQuestionCircle size={doubleSpacer} />
          </div>
          <div style={{ marginLeft: baseSpacer }}>
            <Heading inverse as="h3">
              While you sit back and wait, take our personal information survey.
            </Heading>
            <p>
              Answer a few questions about yourself, and what you prefer in an Agent. RealtyOffer
              will use this information to ensure you are matched with the best Agent for you.
            </p>
          </div>
        </FlexContainer>
      </StyledAlert>
      <HorizontalRule />
      <Row>
        <Column md={3}>
          <SubNav items={consumerNavigationItems} />
          <div>
            <Box textAlign="center">
              <FlexContainer>
                <Heading as="h4" styledAs="subtitle">
                  Get Financed!
                </Heading>
                <p>
                  Interested in connecting with one of our mortgage consultants who will help you
                  get approved for your new home loan?
                </p>
                <GetFinancedForm />
              </FlexContainer>
            </Box>
          </div>
        </Column>
        <Column md={9}>
          <Router basepath="consumer">
            <PrivateRoute component={ConsumerListing} path="/listing" allowedRole="Consumer" />
            <PrivateRoute
              component={ConsumerProfileDetails}
              path="/profile"
              allowedRole="Consumer"
            />
            <PrivateRoute
              component={ConsumerPreferences}
              path="/preferences"
              allowedRole="Consumer"
            />
            <PrivateRoute
              component={ConsumerNotifications}
              path="/manage-notifications"
              allowedRole="Consumer"
            />
          </Router>
        </Column>
      </Row>
    </>
  );
};

export default ConsumerHome;
