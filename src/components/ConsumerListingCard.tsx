import React, { FunctionComponent, useState } from 'react';
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
  restartConsumerListing,
} from '../redux/ducks/consumer';
import { ConsumerStoreType, WinningAgentProfileType } from '../redux/ducks/consumer.d';
import { formatPhoneNumberValue } from '../utils/phoneNumber';
import { buySellTotal, buyTotal, sellTotal } from '../utils/buyingAndSellingCalculator';
import { RootState } from '../redux/ducks';
import { ActionResponseType } from '../redux/constants';
import { addAlert } from '../redux/ducks/globalAlerts';
import { Modal } from './index';
import BidDetails from './BidDetails';

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
  ${(props: { expiringSoon: boolean; isExpired: boolean }) =>
    props.expiringSoon && !props.isExpired && `border-color: ${brandDanger}`};
`;

const ConsumerListingCardHeader = styled.div`
  padding: ${halfSpacer};
  border-bottom: ${baseBorderStyle};
`;

const ConsumerListingCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
`;

type SelectedBidType = BidType & {
  index: number;
};

const ConsumerListingCard: FunctionComponent<ConsumerListingCardProps> = ({
  consumer: { listing, bids, winner, isLoading },
}) => {
  const [selectedBid, setSelectedBid] = useState<SelectedBidType | undefined>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [restartListingModalIsOpen, setRestartListingModalIsOpen] = useState(false);
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

  const winningBid =
    winner && bids && bids.length > 0 && bids.find((bid) => bid.agentId === Number(winner.id));

  const restartListing = () => {
    dispatch(
      restartConsumerListing({
        ...listing,
        sellersZip: (listing && String(listing.sellersZip)) || '',
      })
    );
  };

  return (
    <ConsumerListingCardWrapper
      expiringSoon={isExpiringSoon(listing.createDateTime)}
      isExpired={isExpired(listing.createDateTime)}
    >
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
      {winner && winner.agentId && (
        <ConsumerListingCardBody>
          <FlexContainer justifyContent="space-between">
            <Heading as="h3">Winning Realtor</Heading>
            <p>
              <Button type="button" onClick={() => setModalIsOpen(true)} color="text">
                What should I expect now?
              </Button>
            </p>
          </FlexContainer>
          <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
            <Heading styledAs="title">What should I expect now?</Heading>
            {listing.type === 'seller' && (
              <>
                <p>
                  Now that you are selling your home, you should be prepared to go to market. Have
                  you had your home pre-inspected? Do you think it needs repairs?
                </p>
                <p>
                  Homeowners save and profit 10% to 15% extra by simply having a certified home
                  inspector prepare a 250 point inspection & repair list. Our affiliates will give
                  you an instant full review on any home repairs that need to be done in advance.
                  Prepare yourself and don&apos;t get stuck in a negotiation battle.
                </p>
                <p>Now that you are ready to sell, Realtyoffer is here to help you think ahead.</p>
                <p>
                  Will you be purchasing a new home? Do you need an experienced home lending advisor
                  to pre-approve your new purchase? Do you need a second review? Listing agents will
                  not accept an offer without this document being included. Don&apos;t let the home
                  of your dreams slip through your fingers by not being prepared. Mortgage
                  consultations are completely free!
                </p>
              </>
            )}
            {listing.type === 'buyer' && (
              <>
                <p>
                  Now that you are purchasing a new home, you will need a certified home inspection
                  company.
                </p>
                <p>
                  Our affiliates are standing by and are ready to make sure you are purchasing the
                  right home at the right price.
                </p>
                <p>
                  Now that you are ready to start looking for a new home, Realtyoffer is here to
                  help you think ahead.
                </p>
                <p>
                  Do you need an experienced home lending advisor to pre-approve your new purchase?
                  Do you need a second review? Listing agents will not accept an offer without this
                  document being included. Don&apos;t miss out on the home of your dreams by not
                  being prepared. Mortgage consultations are completely free.
                </p>
              </>
            )}

            {listing.type === 'buyerSeller' && (
              <>
                <p>
                  Now that you are selling one home and purchasing another, you will need a
                  certified home inspection company.
                </p>
                <p>
                  Have you had your home pre-inspected? Do you think it needs repairs? Our
                  affiliates are standing by and are ready to help you through the process.
                </p>
                <p>
                  Now that you are ready to start looking for a new home, Realtyoffer is here to
                  help you think ahead.
                </p>
                <p>
                  Do you need an experienced home lending advisor to pre-approve your new purchase?
                  Do you need a second review? Listing agents will not accept an offer without this
                  document being included. Don&apos;t miss out on the home of your dreams by not
                  being prepared. Mortgage consultations are completely free.
                </p>
              </>
            )}

            <p>
              Get connected <a href="mailto:info@realtyoffer.com">info@realtyoffer.com</a>
            </p>
          </Modal>
          <p>Agent contact information and terms of the contract can be found below.</p>
          <Row>
            <Column lg={2}>
              <Avatar
                size="lg"
                bottomMargin
                src={winner.avatar}
                gravatarEmail={winner.emailAddress as string}
              />
            </Column>
            <Column lg={10}>
              <Row>
                <Column md={4}>
                  <Heading as="h4" styledAs="subtitle">
                    {winner.firstName} {winner.lastName}
                  </Heading>
                  <dl>
                    <dt>Agent ID:</dt>
                    <dd>{winner.agentId}</dd>
                    <dt>Broker:</dt>
                    <dd>
                      {winner.brokerName}
                      <br />
                      {winner.brokerAddressLine1}
                      <br />
                      {!!winner.brokerAddressLine2 && (
                        <>
                          {winner.brokerAddressLine2}
                          <br />
                        </>
                      )}
                      {winner.brokerCity}, {winner.brokerState} {winner.brokerZip}
                    </dd>
                  </dl>
                </Column>
                <Column md={8}>
                  <Heading as="h4" styledAs="subtitle">
                    Contact Information
                  </Heading>
                  <dl>
                    <dt>Agent Email:</dt>
                    <dd>{winner.emailAddress}</dd>
                    <dt>Agent Phone:</dt>
                    <dd>{winner.phoneNumber && formatPhoneNumberValue(winner.phoneNumber)}</dd>
                    <dt>Broker Email:</dt>
                    <dd>{winner.brokerEmail}</dd>
                    <dt>Broker Phone:</dt>
                    <dd>
                      {winner.brokerPhoneNumber && formatPhoneNumberValue(winner.brokerPhoneNumber)}
                    </dd>
                  </dl>
                </Column>
              </Row>
              {winner.aboutMe && winner.aboutMe?.length > 0 && (
                <>
                  <Heading as="h4" styledAs="subtitle">
                    About {winner.firstName}
                  </Heading>
                  <p>{winner.aboutMe || 'No bio provided'}</p>
                </>
              )}
              {winner.certificates && winner.certificates?.length > 0 && (
                <>
                  <Heading as="h4" styledAs="subtitle">
                    Certificates
                  </Heading>
                  <p>{winner.certificates}</p>
                </>
              )}
            </Column>
          </Row>
          <HorizontalRule />
          <Heading as="h3">Listing Contract</Heading>
          {winningBid && <BidDetails listing={listing} bid={winningBid} />}
          <HorizontalRule />
        </ConsumerListingCardBody>
      )}
      {selectedBid && (
        <Modal toggleModal={() => setSelectedBid(undefined)} isOpen={Boolean(selectedBid)}>
          <Heading as="h1" styledAs="title" align="center">
            Future Agent #{selectedBid.index + 1} - Package Details
          </Heading>
          <FlexContainer flexDirection="column">
            <Heading as="h2" styledAs="subtitle" align="center" noMargin>
              Total Package:{' '}
              {listing.type === 'seller' &&
                sellTotal({
                  values: selectedBid,
                  priceRangeId: Number(listing.sellersListingPriceInMindPriceRangeInMindId),
                  priceRangesList,
                })}
              {listing.type === 'buyer' &&
                buyTotal({
                  values: selectedBid,
                  priceRangeId: Number(listing.buyingPriceRangeId),
                  priceRangesList,
                })}
              {listing.type === 'buyerSeller' &&
                buySellTotal({
                  values: selectedBid,
                  buyPriceRangeId: Number(listing.buyingPriceRangeId),
                  sellPriceRangeId: Number(listing.sellersListingPriceInMindPriceRangeInMindId),
                  priceRangesList,
                })}
            </Heading>
            <p>
              <small>Money towards your closing costs and prepaid items</small>
            </p>
          </FlexContainer>
          <BidDetails listing={listing} bid={selectedBid} />
          <Row>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => setSelectedBid(undefined)}
                color="primaryOutline"
                block
              >
                Close
              </Button>
            </Column>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => selectWinningAgent(selectedBid)}
                block
                isLoading={isLoading}
              >
                Select Agent
              </Button>
            </Column>
          </Row>
        </Modal>
      )}
      {bids && bids.length === 0 && !winner && (
        <ConsumerListingCardBody>
          <Heading as="h4">Sorry, your listing didn&apos;t receive any bids.</Heading>
          <p>
            You can{' '}
            <span
              role="button"
              onKeyPress={() => setRestartListingModalIsOpen(true)}
              onClick={() => setRestartListingModalIsOpen(true)}
              style={{ color: brandPrimary, textDecoration: 'underline' }}
              tabIndex={-1}
            >
              start a new listing
            </span>{' '}
            to receive three more bids.
          </p>
          <HorizontalRule />
        </ConsumerListingCardBody>
      )}
      {bids && bids.length > 0 && !winner && (
        <ConsumerListingCardBody>
          <Heading as="h4">Select your agent below</Heading>
          <p>
            Please select your RealtyOffer agent below. Below are the three best Agents based on the
            information you provided. If you do not like the choices below, you can{' '}
            <span
              role="button"
              onKeyPress={() => setRestartListingModalIsOpen(true)}
              onClick={() => setRestartListingModalIsOpen(true)}
              style={{ color: brandPrimary, textDecoration: 'underline' }}
              tabIndex={-1}
            >
              start a new listing
            </span>{' '}
            to receive three more bids.
          </p>
          <Row>
            {bids.map((bid, index) => (
              <Column key={bid.id} md={4}>
                <Box textAlign="center">
                  <FlexContainer>
                    <Avatar size="md" bottomMargin gravatarEmail="" />
                  </FlexContainer>
                  <Heading as="h2" styledAs="subtitle" align="center">
                    Future Agent {index + 1}
                  </Heading>
                  <dl>
                    <dt>Total Savings</dt>
                    <dd>
                      {listing.type === 'seller' &&
                        sellTotal({
                          values: bid,
                          priceRangeId: Number(listing.sellersListingPriceInMindPriceRangeInMindId),
                          priceRangesList,
                        })}
                      {listing.type === 'buyer' &&
                        buyTotal({
                          values: bid,
                          priceRangeId: Number(listing.buyingPriceRangeId),
                          priceRangesList,
                        })}
                      {listing.type === 'buyerSeller' &&
                        buySellTotal({
                          values: bid,
                          buyPriceRangeId: Number(listing.buyingPriceRangeId),
                          sellPriceRangeId: Number(
                            listing.sellersListingPriceInMindPriceRangeInMindId
                          ),
                          priceRangesList,
                        })}
                    </dd>
                  </dl>

                  <p>
                    <Button
                      type="button"
                      color="text"
                      allowTextWrap
                      onClick={() => setSelectedBid({ ...bid, index })}
                    >
                      View Full Package Details
                    </Button>
                  </p>
                  <Button
                    type="button"
                    onClick={() => selectWinningAgent(bid)}
                    block
                    isLoading={isLoading}
                  >
                    Select Agent
                  </Button>
                </Box>
              </Column>
            ))}
          </Row>
          <HorizontalRule />
        </ConsumerListingCardBody>
      )}
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
      <Modal
        toggleModal={() => setRestartListingModalIsOpen(false)}
        isOpen={restartListingModalIsOpen}
      >
        <Heading styledAs="title">Are you sure you want to start a new listing?</Heading>
        <p>These bids will be disgarded and you will receive three new bids.</p>
        <Row>
          <Column xs={6}>
            <Button
              type="button"
              onClick={() => setRestartListingModalIsOpen(false)}
              color="primaryOutline"
              block
            >
              Cancel
            </Button>
          </Column>
          <Column xs={6}>
            <Button type="button" onClick={() => restartListing()} color="dangerOutline" block>
              Restart Listing
            </Button>
          </Column>
        </Row>
      </Modal>
    </ConsumerListingCardWrapper>
  );
};

export default ConsumerListingCard;
