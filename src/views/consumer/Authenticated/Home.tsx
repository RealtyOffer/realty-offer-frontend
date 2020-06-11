import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

import {
  FlexContainer,
  Heading,
  ConsumerListingCard,
  Seo,
  HorizontalRule,
} from '../../../components';
import { getConsumerProfile } from '../../../redux/ducks/consumer';
import { RootState } from '../../../redux/ducks';
import Notifications from './Notifications';
import ProfileDetails from './ProfileDetails';

import { baseSpacer, doubleSpacer, borderRadius } from '../../../styles/size';
import { brandTertiary, white } from '../../../styles/color';

const StyledAlert = styled.div`
  padding: ${baseSpacer};
  background-color: ${brandTertiary};
  color: ${white};
  border-radius: ${borderRadius};
`;

const ConsumerHome: FunctionComponent<RouteComponentProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const consumer = useSelector((state: RootState) => state.consumer);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConsumerProfile());
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
      <Heading as="h2">My Info</Heading>
      <ProfileDetails />
      <Heading as="h2">My Listings</Heading>
      <ConsumerListingCard
        listing={{
          id: 1,
          createDateTime: 'Mon Jun 08 2020 23:59:28 GMT-0400 (Eastern Daylight Time)',
          ...consumer.signupData,
        }}
      />
      <Heading as="h2">Notifications</Heading>
      <Notifications user={user} />
    </>
  );
};

export default ConsumerHome;
