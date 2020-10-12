import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

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
import { isExpired, isExpiringSoon } from '../utils/countdownTimerUtils';
import {
  createConsumerBidWinner,
  getConsumerBids,
  getWinningAgentProfile,
  getWinningAgentProfilePhoto,
} from '../redux/ducks/consumer';
import { ConsumerStoreType, WinningAgentProfileType } from '../redux/ducks/consumer.d';
import { formatPhoneNumberValue } from '../utils/phoneNumber';
import { buyTotal, sellTotal } from '../utils/buyingAndSellingCalculator';
import { RootState } from '../redux/ducks';
import { ActionResponseType } from '../redux/constants';
import { addAlert } from '../redux/ducks/globalAlerts';

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
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();

  const selectWinningAgent = (bid: BidType) => {
    dispatch(createConsumerBidWinner(bid)).then((response: ActionResponseType) => {
      if (response && !response.error) {
        dispatch(getWinningAgentProfile()).then((res: { payload: WinningAgentProfileType }) => {
          if (res.payload?.userName) {
            dispatch(getWinningAgentProfilePhoto(res.payload.userName));
            dispatch(
              addAlert({
                type: 'success',
                message:
                  'Congrats! You have selected an agent to work with. We will now notify them.',
              })
            );
          }
        });
      }
    });
  };

  if (!listing) {
    return null;
  }

  const winningBid = winner && bids.find((bid) => bid.agentId === Number(winner.id));

  return (
    <ConsumerListingCardWrapper expiringSoon={isExpiringSoon(listing.createDateTime)}>
      <ConsumerListingCardHeader>
        <FlexContainer flexDirection="column">
          {!isExpired(listing.createDateTime) ? (
            <small>Time remaining before your listing is done receiving bids</small>
          ) : (
            <small>Listing ended at</small>
          )}

          <Countdown
            createDateTime={listing.createDateTime}
            onComplete={() => {
              dispatch(
                addAlert({
                  type: 'info',
                  message: 'The bidding window for this listing has just ended.',
                })
              );
              dispatch(getConsumerBids());
            }}
          />
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
                <dt>What is the type of your home?</dt>
                <dd>{displayDropdownListText(listing.sellerTypeOfHomeId, 'homeTypes')}</dd>
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
                <dt>What type of home are you looking for?</dt>
                <dd>{displayDropdownListText(listing.buyerTypeOfHomeId, 'homeTypes')}</dd>
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
      {winner && winner.agentId && (
        <ConsumerListingCardBody>
          <HorizontalRule />
          <Heading as="h3">Winning Realtor</Heading>
          <p>Agent contact information and terms of the contract can be found below.</p>
          <Row>
            <Column lg={2}>
              <Avatar size="lg" bottomMargin src={winner.avatar} />
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
                        <strong>Phone:</strong>{' '}
                        {winner.phoneNumber && formatPhoneNumberValue(winner.phoneNumber)}
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
          <Row>
            {listing.type?.toLowerCase().includes('seller') && winningBid && (
              <Column xs={6}>
                <dl>
                  <dt>Total Seller Commission</dt>
                  <dd>{winningBid.sellerCommission}%</dd>
                  {winningBid.sellerBrokerComplianceAmount && (
                    <>
                      <dt>Seller Compliance Fee</dt>
                      <dd>${winningBid.sellerBrokerComplianceAmount}</dd>
                    </>
                  )}
                  {winningBid.sellerPreInspectionAmount && (
                    <>
                      <dt>Seller Pre-Inspection</dt>
                      <dd>${winningBid.sellerPreInspectionAmount}</dd>
                    </>
                  )}
                  {winningBid.sellerPreCertifyAmount && (
                    <>
                      <dt>Seller Pre-Certification</dt>
                      <dd>${winningBid.sellerPreCertifyAmount}</dd>
                    </>
                  )}
                  {winningBid.sellerMovingCompanyAmount && (
                    <>
                      <dt>Seller Moving Costs</dt>
                      <dd>${winningBid.sellerMovingCompanyAmount}</dd>
                    </>
                  )}
                  {winningBid.sellerPhotographyAmount && (
                    <>
                      <dt>Seller Photography</dt>
                      <dd>${winningBid.sellerPhotographyAmount}</dd>
                    </>
                  )}
                </dl>
                <Heading as="h5">Total Savings</Heading>
                <p>
                  {sellTotal({
                    values: winningBid,
                    priceRangeId: Number(listing.sellersListingPriceInMindPriceRangeInMindId),
                    priceRangesList,
                  })}
                </p>
              </Column>
            )}
            {listing.type?.includes('buyer') && winningBid && (
              <Column xs={6}>
                <dl>
                  <dt>Total Buyer Commission</dt>
                  <dd>{winningBid.buyerCommission}%</dd>
                  {winningBid.buyerBrokerComplianceAmount && (
                    <>
                      <dt>Buyer Compliance Fee</dt>
                      <dd>${winningBid.buyerBrokerComplianceAmount}</dd>
                    </>
                  )}
                  {winningBid.buyerInspectionAmount && (
                    <>
                      <dt>Buyer Inspection</dt>
                      <dd>${winningBid.buyerInspectionAmount}</dd>
                    </>
                  )}
                  {winningBid.buyerHomeWarrantyAmount && (
                    <>
                      <dt>Buyer Home Warranty</dt>
                      <dd>${winningBid.buyerHomeWarrantyAmount}</dd>
                    </>
                  )}
                  {winningBid.buyerAppraisalAmount && (
                    <>
                      <dt>Buyer Appraisal</dt>
                      <dd>${winningBid.buyerAppraisalAmount}</dd>
                    </>
                  )}
                  {winningBid.buyerMovingCompanyAmount && (
                    <>
                      <dt>Buyer Moving Costs</dt>
                      <dd>${winningBid.buyerMovingCompanyAmount}</dd>
                    </>
                  )}
                </dl>
                <Heading as="h5">Total Savings</Heading>
                <p>
                  {buyTotal({
                    values: winningBid,
                    priceRangeId: Number(listing.buyingPriceRangeId),
                    priceRangesList,
                  })}
                </p>
              </Column>
            )}
          </Row>
        </ConsumerListingCardBody>
      )}
    </ConsumerListingCardWrapper>
  );
};

export default ConsumerListingCard;
