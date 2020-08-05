import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Heading from './Heading';
import { brandDanger, white, brandPrimary } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import FlexContainer from './FlexContainer';
import HorizontalRule from './HorizontalRule';
import Row from './Row';
import Column from './Column';
import Countdown from './Countdown';
import Avatar from './Avatar';
import Box from './Box';
import Button from './Button';

import { BidType } from '../redux/ducks/agent.d';
import { displayDropdownListText } from '../utils/dropdownUtils';
import { isExpiringSoon } from '../utils/countdownTimerUtils';
import { createConsumerBidWinner } from '../redux/ducks/consumer';
import { ConsumerStoreType } from '../redux/ducks/consumer.d';

type ConsumerListingCardProps = {
  consumer: ConsumerStoreType;
};

const ConsumerListingCardWrapper = styled.div`
  background: ${white};
  margin-bottom: ${baseSpacer};
  box-shadow: ${z1Shadow};
  border-left: ${baseSpacer} solid ${brandPrimary};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: column;
  height: calc(100% - ${baseSpacer});
  ${(props: { expiringSoon: boolean }) => props.expiringSoon && `border-color: ${brandDanger}`};
`;

const ConsumerListingCardHeader = styled.div`
  padding: ${halfSpacer};
  border-bottom: ${baseBorderStyle};
`;

const ConsumerListingCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
`;

const ConsumerListingCard: FunctionComponent<ConsumerListingCardProps> = ({
  consumer: { listing, bids, winner },
}) => {
  const dispatch = useDispatch();

  const selectWinningAgent = (bid: BidType) => {
    dispatch(createConsumerBidWinner(bid));
  };

  if (!listing) {
    return null;
  }

  return (
    <ConsumerListingCardWrapper expiringSoon={isExpiringSoon(listing.createDateTime)}>
      <ConsumerListingCardHeader>
        <FlexContainer flexDirection="column">
          <small>Time remaining before your listing is done receiving bids</small>
          <Countdown createDateTime={listing.createDateTime} />
        </FlexContainer>
      </ConsumerListingCardHeader>
      <ConsumerListingCardBody>
        {listing.type?.toLowerCase().includes('seller') && (
          <Row>
            <Column md={7}>
              <Heading as="h1" noMargin styledAs="title" align="center">
                {displayDropdownListText(
                  listing.sellersListingPriceInMindPriceRangeInMindId,
                  'priceRanges'
                )}
              </Heading>
              <div style={{ textAlign: 'center' }}>Selling in {listing.sellersCity?.name}</div>
            </Column>
            <Column md={5}>
              <dl>
                <dt>How soon are you looking to sell your home?</dt>
                <dd>{listing.sellersTimeline}</dd>
                <dt>What is your estimated mortgage balance?</dt>
                <dd>{displayDropdownListText(listing.sellersMortgageBalanceId, 'priceRanges')}</dd>
              </dl>
            </Column>
          </Row>
        )}
        {listing.type === 'buyerSeller' && <HorizontalRule />}
        {listing.type?.includes('buyer') && (
          <Row>
            <Column md={7}>
              <Heading as="h1" noMargin styledAs="title" align="center">
                {displayDropdownListText(listing.buyingPriceRangeId, 'priceRanges')}
              </Heading>
              <div style={{ textAlign: 'center' }}>
                Buying in{' '}
                {Array(listing.buyingCities?.map((city) => city.name))
                  .toString()
                  .replace(/,/g, ', ')}
              </div>
            </Column>
            <Column md={5}>
              <dl>
                <dt>Would you like a free mortgage consultation?</dt>
                <dd>{listing.freeMortgageConsult ? 'Yes' : 'No'}</dd>
                <dt>Have you received a mortgage pre-approval?</dt>
                <dd>{listing.preApproved ? 'Yes' : 'No'}</dd>
              </dl>
            </Column>
          </Row>
        )}
      </ConsumerListingCardBody>
      {bids && bids.length > 0 && !winner && (
        <ConsumerListingCardBody>
          <HorizontalRule />
          <Row>
            {bids.map((bid, index) => (
              <Column key={bid.id} sm={4}>
                <Box textAlign="center">
                  <Avatar size="md" bottomMargin />
                  <Heading as="h2" styledAs="subtitle" align="center">
                    Future Agent {index + 1}
                  </Heading>
                  <dl>
                    <dt>Total Commission Towards Sale of the home</dt>
                    <dd>{bid.sellerCommission}%</dd>
                    <dt>Compliance Fee</dt>
                    <dd>${bid.sellerBrokerComplianceAmount}</dd>
                  </dl>
                  <Button type="button" onClick={() => selectWinningAgent(bid)} block>
                    Select
                  </Button>
                </Box>
              </Column>
            ))}
          </Row>
        </ConsumerListingCardBody>
      )}
      {winner && (
        <ConsumerListingCardBody>
          <HorizontalRule />
          <Heading as="h3">Winning Realtor</Heading>
          <p>Agent contact information and terms of the contract can be found below.</p>
          <Row>
            <Column lg={2}>
              <Avatar size="lg" bottomMargin />
            </Column>
            <Column lg={10}>
              <Row>
                <Column md={4}>
                  <Heading as="h4" styledAs="subtitle">
                    {winner.firstName} {winner.lastName}
                  </Heading>
                  <p>{winner.brokerName}</p>
                </Column>
                <Column md={8}>
                  <Heading as="h4" styledAs="subtitle">
                    Contact Information
                  </Heading>
                  <Row>
                    <Column xs={6}>
                      <p>
                        <strong>Email:</strong> {winner.emailAddress}
                      </p>
                    </Column>
                    <Column xs={6}>
                      <p>
                        <strong>Phone:</strong> {winner.phoneNumber}
                      </p>
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Heading as="h4" styledAs="subtitle">
                About {winner.firstName}
              </Heading>
              <p>Agent bio goes here</p>
            </Column>
          </Row>
          <HorizontalRule />
          <Heading as="h3">Listing Contract</Heading>
        </ConsumerListingCardBody>
      )}
    </ConsumerListingCardWrapper>
  );
};

export default ConsumerListingCard;