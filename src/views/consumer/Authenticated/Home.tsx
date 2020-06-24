import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';
import isBefore from 'date-fns/isBefore';

import {
  FlexContainer,
  Heading,
  Seo,
  HorizontalRule,
  Row,
  Column,
  SubNav,
} from '../../../components';
import { getConsumerProfile, getConsumerBids } from '../../../redux/ducks/consumer';
import { RootState } from '../../../redux/ducks';
import ConsumerNotifications from './ConsumerNotifications';
import ConsumerProfileDetails from './ConsumerProfileDetails';
import ConsumerListing from './ConsumerListing';

import { baseSpacer, doubleSpacer, borderRadius } from '../../../styles/size';
import { brandTertiary, white } from '../../../styles/color';
import { expiresAt } from '../../../utils/countdownTimerUtils';
import consumerNavigationItems from '../../../utils/consumerNavigationItems';

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
  }, []);

  useEffect(() => {
    if (consumer.listing && isBefore(expiresAt(consumer.listing.createDateTime), new Date())) {
      dispatch(getConsumerBids());
    }
  }, [consumer.listing]);

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
        </Column>
        <Column md={9}>
          <Router>
            <ConsumerListing path="/listing" />
            <ConsumerProfileDetails path="/profile" />
            <ConsumerNotifications path="/manage-notifications" />
          </Router>
        </Column>
      </Row>
    </>
  );
};

export default ConsumerHome;
