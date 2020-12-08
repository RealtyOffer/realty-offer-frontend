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
              <Button type="button" onClick={() => setModalIsOpen(true)} color="success">
                What should I expect now?
              </Button>
            </p>
          </FlexContainer>
          <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
            <Heading styledAs="title">What should I expect now?</Heading>
            {listing.type === 'seller' && (
              <>
                <p>
                  Congratulations,
                  <br />
                  You are on your way to saving thousands of dollars on the sale of your home! Now
                  that you have selected your top-rated certified agent, here are a few things you
                  should expect:
                </p>
                <ol>
                  <li>
                    <p>
                      You will notice a downloadable PDF in the upper right corner of your awarded
                      offer page. This PDF entails the terms and conditions your agent has offered
                      and agreed to. Your agent will have the same terms and conditions to present
                      to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      Your selected agent will provide a listing contract that will entail a reduced
                      commission structure, that will match your downloadable PDF terms and
                      conditions. A standard listing contract is typically signed for a term of 3
                      months. This time frame can vary based on your location and season during
                      which you list your home.
                    </p>
                  </li>
                  <li>
                    <p>
                      Now that you are selling your home and purchasing another, you will need a
                      certified home inspection company. Have you had your home pre-inspected? Do
                      you think it requires any repairs? Prepare your home for a sale by requesting
                      a certified home inspector through RealtyCert. They will prepare a 125-point
                      home PRE-inspection; this will allow you to complete your repairs before your
                      home goes on the market. Our affiliates are standing by and are ready to help
                      you through the process.
                    </p>
                  </li>
                  <li>
                    <p>
                      Now that you are ready to start looking for a new home, RealtyOffer is here to
                      help you think ahead.
                      <br />
                      <br />
                      Do you need an experienced home lending advisor to pre-approve your new
                      purchase? Do you need a second review? Listing agents will not accept an offer
                      without a pre-approval included in the offer package. Don&apos;t miss out on
                      the home of your dreams by not being prepared. Mortgage consultations are
                      completely free.
                    </p>
                  </li>
                </ol>
              </>
            )}
            {listing.type === 'buyer' && (
              <>
                <p>
                  Congratulations,
                  <br />
                  You are on your way to saving thousands of dollars on your next home purchase! Now
                  that you have selected your top-rated certified agent, here are a few things you
                  should expect:
                </p>
                <ol>
                  <li>
                    <p>
                      You will notice a downloadable PDF in the upper right corner of your awarded
                      offer page. This PDF entails the terms and conditions your agent has offered
                      and agreed to. Your agent will have the same terms and conditions to present
                      to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      In order for an agent to offer you part of their commission, they will need to
                      create an addendum to your purchase agreement. This addendum will show the
                      same commission amount that was agreed upon. Once executed, you will need to
                      submit it to your mortgage company (if any) and title company of choice. The
                      title company will simply deduct the amount from the agent’s commission. Your
                      mortgage company will simply apply the commission towards your closing costs
                      and pre-paid items – this means less money for you to bring to the closing
                      table.
                    </p>
                  </li>
                  <li>
                    <p>
                      The selected agent may present an exclusive agency agreement. This is a
                      standard legal document that some real estate brokerages require their clients
                      and agents to sign. It states that you are choosing to work exclusively with
                      your selected agent, and their broker. If for any reason you are not satisfied
                      with the service provided by your agent, you can simply notify them via email
                      that you no longer wish to work together, and the agreement will be
                      terminated.
                    </p>
                  </li>
                  <li>
                    <p>
                      Now that you are ready to start looking for a new home, RealtyOffer is here to
                      help you think ahead. Do you need an experienced home lending advisor to
                      pre-approve your new purchase? Do you need a second review? Listing agents
                      will not accept an offer without a pre-approval included in the offer package.
                      Don&apos;t miss out on the home of your dreams by not being prepared. Mortgage
                      consultations are completely free.
                    </p>
                  </li>
                </ol>
              </>
            )}

            {listing.type === 'buyerSeller' && (
              <>
                <p>
                  Congratulations,
                  <br />
                  You are on your way to saving thousands of dollars on the sale of your home and
                  thousands of dollars in closing costs on your next home purchase! Now that you
                  have selected your top-rated certified agent, here are a few things you should
                  expect:
                </p>
                <ol>
                  <li>
                    <p>
                      You will notice a downloadable PDF in the upper right corner of your awarded
                      offer page. This PDF entails the terms and conditions your agent has offered
                      and agreed to. Your agent will have the same terms and conditions to present
                      to you.
                    </p>
                  </li>
                  <li>
                    <p>
                      Your selected agent will provide a listing contract that will entail a reduced
                      commission structure that will match your downloadable PDF terms and
                      conditions. A standard listing contract is typically signed for a term of 3
                      months. This time frame can vary based on your location and season during
                      which you list your home.
                    </p>
                  </li>
                  <li>
                    <p>
                      Upcoming purchase: In order for an agent to offer you part of their
                      commission, they will need to create an addendum to your purchase agreement.
                      This addendum will show the same commission amount that was agreed upon. Once
                      executed, you will need to submit it to your mortgage company (if any) and
                      title company of choice. The title company will simply deduct the amount from
                      the agent’s commission. Your mortgage company will simply apply the commission
                      towards your closing costs and pre-paid items – this means less money for you
                      to bring to the closing table.
                    </p>
                  </li>
                  <li>
                    <p>
                      The selected agent may present an exclusive agency agreement. This is a
                      standard legal document that some real estate brokerages require their clients
                      and agents to sign. It states that you are choosing to work exclusively with
                      your selected agent, and their broker. If for any reason you are not satisfied
                      with the service provided by your agent, you can simply notify them via email
                      that you no longer wish to work together, and the agreement will be
                      terminated.
                    </p>
                  </li>
                  <li>
                    <p>
                      Now that you are selling your home and purchasing another, you will need a
                      certified home inspection company. Have you had your home pre-inspected? Do
                      you think it needs repairs? Prepare your home for a sale, request a certified
                      home inspector through RealtyCert. They will prepare a 125-point home
                      PRE-inspection; this will allow you to complete your repairs before your home
                      goes on the market. Prevent yourself from going into a seller battle! Our
                      affiliates are standing by and are ready to help you through the process.
                    </p>
                  </li>
                  <li>
                    <p>
                      Now that you are ready to start looking for a new home, RealtyOffer is here to
                      help you think ahead. Do you need an experienced home lending advisor to
                      pre-approve your new purchase? Do you need a second review? Listing agents
                      will not accept an offer without a pre-approval included in the offer package.
                      Don&apos;t miss out on the home of your dreams by not being prepared. Mortgage
                      consultations are completely free.
                    </p>
                  </li>
                </ol>
              </>
            )}

            <p>
              <a
                href={`mailto:info@realtyoffer.com?subject=Next%20Steps&body=I%20am%20interested%20in%20learning%20about%20how%20RealtyOffer%20can%20help%20my%20in%20the%20next%20steps%20for%20${
                  listing.type === 'buyerSeller' ? 'buying%20and%20selling' : listing.type
                }`}
              >
                Click to Get Connected - info@realtyoffer.com
              </a>
            </p>
            <p>Congratulations!</p>
            <p>And welcome to RealtyOffer.</p>
          </Modal>
          <p>Agent contact information and terms of the contract can be found below.</p>
          <p>
            If you don&apos;t feel like your Agent is a good match once you have connected, you can
            always{' '}
            <span
              role="button"
              onKeyPress={() => setRestartListingModalIsOpen(true)}
              onClick={() => setRestartListingModalIsOpen(true)}
              style={{ color: brandPrimary, textDecoration: 'underline' }}
              tabIndex={-1}
            >
              start a new listing
            </span>{' '}
            to start the process over and receive more bids.
          </p>
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
            to receive more bids.
          </p>
          <HorizontalRule />
        </ConsumerListingCardBody>
      )}
      {bids && bids.length > 0 && !winner && (
        <ConsumerListingCardBody>
          <Heading as="h4">Select your agent below</Heading>
          <p>
            Please select your RealtyOffer agent below.{' '}
            {bids.length === 1
              ? 'Only one Agent was matched with you'
              : `Below are the ${bids.length} best Agents`}{' '}
            based on the information you provided. If you do not like the choices below, you can{' '}
            <span
              role="button"
              onKeyPress={() => setRestartListingModalIsOpen(true)}
              onClick={() => setRestartListingModalIsOpen(true)}
              style={{ color: brandPrimary, textDecoration: 'underline' }}
              tabIndex={-1}
            >
              start a new listing
            </span>{' '}
            to receive more bids.
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
