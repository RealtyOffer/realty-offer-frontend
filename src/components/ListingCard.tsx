import React, { FunctionComponent, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import TextTruncate from 'react-text-truncate';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';

import Button from './Button';
import Heading from './Heading';
import Countdown from './Countdown';
import Modal from './Modal';
import Row from './Row';
import Column from './Column';

import { brandSuccess, brandDanger, textColor, white } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius } from '../styles/size';
import { z1Shadow, baseBorderStyle } from '../styles/mixins';
import FlexContainer from './FlexContainer';
import HorizontalRule from './HorizontalRule';
import {
  getNewListings,
  getPendingListings,
  getAwardedListings,
  getHistoryListings,
  toggleListingVisibility,
} from '../redux/ducks/listings';
import { ListingType } from '../redux/ducks/listings.d';
import { displayDropdownListText } from '../utils/dropdownUtils';
import { isExpired, isExpiringSoon } from '../utils/countdownTimerUtils';

type ListingCardProps = {
  listing: ListingType;
  listingType: 'new' | 'pending' | 'awarded' | 'history';
  isHideable?: boolean;
  awarded?: boolean;
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

// const CardType = styled.span`
//   background-color: ${brandTertiary};
//   border-radius: ${borderRadius};
//   color: ${white};
//   padding: 0 ${halfSpacer};
//   text-transform: capitalize;
// `;

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

const ListingCard: FunctionComponent<ListingCardProps> = ({
  listing,
  listingType,
  isHideable,
  awarded,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <ListingCardWrapper
      expiringSoon={isExpiringSoon(listing.createDateTime)}
      isExpired={isExpired(listing.createDateTime)}
      awarded={Boolean(awarded)}
    >
      <ListingCardHeader expiringSoon={isExpiringSoon(listing.createDateTime)}>
        <FlexContainer justifyContent="space-between">
          <Countdown
            createDateTime={listing.createDateTime}
            onComplete={() => {
              // give it 5 seconds so the backend has time to work
              setTimeout(() => {
                dispatch(getNewListings());
                dispatch(getPendingListings());
                dispatch(getAwardedListings());
                dispatch(getHistoryListings());
              }, 5000);
            }}
          />
          <div>
            {/* <CardType>{listing.type === 'buyerSeller' ? 'Buyer & Seller' : listing.type}</CardType> */}
            {isHideable && (
              <>
                <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
                  <Heading styledAs="title">Hide Listing?</Heading>
                  <p>Are you sure you want to hide the listing?</p>
                  <Row>
                    <Column xs={6}>
                      <Button
                        type="button"
                        onClick={() => setModalIsOpen(false)}
                        color="primaryOutline"
                        block
                      >
                        Cancel
                      </Button>
                    </Column>
                    <Column xs={6}>
                      <Button
                        type="button"
                        onClick={async () => {
                          if (listing.id != null) {
                            dispatch(toggleListingVisibility(listing.id));
                          }
                        }}
                        block
                        color="danger"
                      >
                        Hide
                      </Button>
                    </Column>
                  </Row>
                </Modal>
                <Button
                  type="button"
                  onClick={() => setModalIsOpen(true)}
                  iconLeft={<FaTrashAlt />}
                  color="text"
                >
                  Remove Listing
                </Button>
              </>
            )}
          </div>
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
};

export default ListingCard;
