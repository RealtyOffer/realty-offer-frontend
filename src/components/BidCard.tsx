import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import Countdown from 'react-countdown';
import { FaRegClock } from 'react-icons/fa';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';

import Button from './Button';
import Heading from './Heading';

import { brandDanger, textColor, white, brandTertiary } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import FlexContainer from './FlexContainer';
import HorizontalRule from './HorizontalRule';

import { ListingType } from '../redux/ducks/listings.d';

type BidCardProps = {
  listing: ListingType;
};

const BidCardWrapper = styled.div`
  text-align: center;
  background: ${white};
  margin-bottom: ${baseSpacer};
  box-shadow: ${z1Shadow};
  ${(props: { expiringSoon: boolean }) =>
    props.expiringSoon && `border-left: ${baseSpacer} solid ${brandDanger}`};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: column;
  height: calc(100% - ${baseSpacer});
`;

const BidCardHeader = styled.div`
  padding: ${halfSpacer};
  color: ${(props: { expiringSoon: boolean }) => (props.expiringSoon ? brandDanger : textColor)};
  border-bottom: ${baseBorderStyle};
`;

const CardType = styled.span`
  background-color: ${brandTertiary};
  border-radius: ${borderRadius};
  color: ${white};
  padding: 0 ${halfSpacer};
  text-transform: capitalize;
`;

const BidCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const BidCardFooter = styled.div`
  border-top: ${baseBorderStyle};
  padding: ${halfSpacer};
`;

const BidCard: FunctionComponent<BidCardProps> = ({ listing }) => {
  // difference in minutes from expiration date to now, divided by 1440 which is number of minutes
  // in a day (24*60). Then multiply that by 100 to get percentage value
  const timeDifference =
    (differenceInMinutes(new Date(listing.createDateTime), Date.now()) / 1440) * 100;
  const expiringSoon = timeDifference < 8.3333333; // 2 hours out of 24

  return (
    <BidCardWrapper expiringSoon={expiringSoon}>
      <BidCardHeader expiringSoon={expiringSoon}>
        <FlexContainer justifyContent="space-between">
          <div>
            <FaRegClock /> <Countdown date={listing.createDateTime} daysInHours />
          </div>
          <CardType>{listing.type}</CardType>
        </FlexContainer>
      </BidCardHeader>
      <BidCardBody>
        {listing.type.includes('buyer') && (
          <>
            <Heading as="h1" noMargin>
              {listing.buyingPriceRange}
            </Heading>
            <span>
              Buying in{' '}
              {Array.isArray(listing.buyingCities) && listing.buyingCities.length > 0 && (
                <TextTruncate
                  line={1}
                  element="span"
                  truncateText="…"
                  text={Array(listing.buyingCities.map((city) => city.name))
                    .toString()
                    .replace(/,/g, ', ')}
                  textTruncateChild={<Link to={`/agent/listings/${listing.id}`}>More</Link>}
                />
              )}
            </span>
          </>
        )}
        {listing.type === 'buyerSeller' && <HorizontalRule />}
        {listing.type.toLowerCase().includes('seller') && (
          <>
            <Heading as="h1" noMargin>
              {listing.sellersListingPriceInMind}
            </Heading>
            <span>Selling in {listing.sellersCity?.name}</span>
          </>
        )}
      </BidCardBody>
      <BidCardFooter>
        <Button type="link" to={`/agent/listings/${listing.id}`} block>
          Listing Details
        </Button>
      </BidCardFooter>
    </BidCardWrapper>
  );
};

export default BidCard;
