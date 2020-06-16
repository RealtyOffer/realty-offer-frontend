import React, { FunctionComponent } from 'react';
import Countdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import styled from 'styled-components';

import Heading from './Heading';
import { brandDanger, textColor, white, brandPrimary } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import FlexContainer from './FlexContainer';
import HorizontalRule from './HorizontalRule';
import Row from './Row';
import Column from './Column';

import { ListingType } from '../redux/ducks/listings.d';
import displayDropdownListText from '../utils/displayDropdownListText';

type ConsumerListingCardProps = {
  listing: ListingType;
};

const ConsumerListingCardWrapper = styled.div`
  text-align: center;
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
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : textColor)};
  border-bottom: ${baseBorderStyle};
`;

const ConsumerListingCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
`;

const ConsumerListingCard: FunctionComponent<ConsumerListingCardProps> = ({ listing }) => {
  // difference in minutes from expiration date to now, divided by 1440 which is number of minutes
  // in a day (24*60). Then multiply that by 100 to get percentage value
  const timeDifference = listing.createDateTime
    ? (differenceInMinutes(new Date(listing.createDateTime), Date.now()) / 1440) * 100
    : 0;
  const expiringSoon = timeDifference < 8.3333333; // 2 hours out of 24

  return (
    <ConsumerListingCardWrapper expiringSoon={expiringSoon}>
      <ConsumerListingCardHeader expiringSoon={expiringSoon}>
        <FlexContainer flexDirection="column">
          <small>Time remaining before your listing is done receiving bids</small>
          <strong>
            <FaRegClock /> <Countdown date={listing.createDateTime} daysInHours />
          </strong>
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
              <span>Selling in {listing.sellersCity?.name}</span>
            </Column>
            <Column md={5}>
              <dl style={{ textAlign: 'left' }}>
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
              <span>
                Buying in{' '}
                {Array(listing.buyingCities?.map((city) => city.name))
                  .toString()
                  .replace(/,/g, ', ')}
              </span>
            </Column>
            <Column md={5}>
              <dl style={{ textAlign: 'left' }}>
                <dt>Would you like a free mortgage consultation?</dt>
                <dd>{listing.freeMortgageConsult ? 'Yes' : 'No'}</dd>
                <dt>Have you received a mortgage pre-approval?</dt>
                <dd>{listing.preApproved ? 'Yes' : 'No'}</dd>
              </dl>
            </Column>
          </Row>
        )}
      </ConsumerListingCardBody>
    </ConsumerListingCardWrapper>
  );
};

export default ConsumerListingCard;
