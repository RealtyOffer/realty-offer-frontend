import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';

import Button from './Button';
import Heading from './Heading';
import Countdown from './Countdown';

import { brandSuccess, brandDanger, textColor, white, brandTertiary } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import FlexContainer from './FlexContainer';
import HorizontalRule from './HorizontalRule';
import { ListingType } from '../redux/ducks/listings.d';
import { displayDropdownListText } from '../utils/dropdownUtils';
import { isExpired, isExpiringSoon } from '../utils/countdownTimerUtils';

type ListingCardProps = {
  listing: ListingType;
  listingType: 'new' | 'pending' | 'awarded' | 'history';
};

type WrapperProps = {
  expiringSoon: boolean;
  isExpired: boolean;
  awarded: boolean;
};

const ListingCardWrapper = styled.div`
  text-align: center;
  background: ${white};
  margin-bottom: ${baseSpacer};
  box-shadow: ${z1Shadow};
  ${(props: WrapperProps) =>
    props.expiringSoon && !props.isExpired && `border-left: ${baseSpacer} solid ${brandDanger}`};
  ${(props: WrapperProps) => props.awarded && `border-left: ${baseSpacer} solid ${brandSuccess}`};
  border-radius: ${borderRadius};
  display: flex;
  flex-direction: column;
  height: calc(100% - ${baseSpacer});
`;

const ListingCardHeader = styled.div`
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

const ListingCardBody = styled.div`
  padding: ${halfSpacer} ${baseSpacer};
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ListingCardFooter = styled.div`
  border-top: ${baseBorderStyle};
  padding: ${halfSpacer};
`;

const ListingCard: FunctionComponent<ListingCardProps> = ({ listing, listingType }) => (
  <ListingCardWrapper
    expiringSoon={isExpiringSoon(listing.createDateTime)}
    isExpired={isExpired(listing.createDateTime)}
    awarded={listingType === 'awarded'}
  >
    <ListingCardHeader expiringSoon={isExpiringSoon(listing.createDateTime)}>
      <FlexContainer justifyContent="space-between">
        <Countdown createDateTime={listing.createDateTime} />
        <CardType>{listing.type === 'buyerSeller' ? 'Buyer & Seller' : listing.type}</CardType>
      </FlexContainer>
    </ListingCardHeader>
    <ListingCardBody>
      {listing.type?.includes('buyer') && (
        <>
          <Heading as="h1" noMargin styledAs="title">
            {displayDropdownListText(listing.buyingPriceRangeId, 'priceRanges')}
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
                textTruncateChild={
                  <Link to={`/agent/listings/${listingType}/${listing.id}`}>More</Link>
                }
              />
            )}
          </span>
        </>
      )}
      {listing.type === 'buyerSeller' && <HorizontalRule />}
      {listing.type?.toLowerCase().includes('seller') && (
        <>
          <Heading as="h1" noMargin styledAs="title">
            {displayDropdownListText(
              listing.sellersListingPriceInMindPriceRangeInMindId,
              'priceRanges'
            )}
          </Heading>
          <span>Selling in {listing.sellersCity?.name}</span>
        </>
      )}
    </ListingCardBody>
    <ListingCardFooter>
      <Button type="link" to={`/agent/listings/${listingType}/${listing.id}`} block>
        Listing Details
      </Button>
    </ListingCardFooter>
  </ListingCardWrapper>
);

export default ListingCard;
