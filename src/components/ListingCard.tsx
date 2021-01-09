import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';

import Button from './Button';
import Heading from './Heading';
import Countdown from './Countdown';
import Modal from './Modal';
import Row from './Row';
import Column from './Column';

import { brandSuccess, brandDanger, textColor, white, lightestGray } from '../styles/color';
import { halfSpacer, baseSpacer, borderRadius, quarterSpacer } from '../styles/size';
import { fontSizeH6 } from '../styles/typography';
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
  /* text-align: center; */
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
  /* justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column; */
`;

export const ListingDetailsTable = styled.table`
  width: 100%;
  & td {
    padding: 0 ${quarterSpacer};
  }
  & tr:nth-child(1) td {
    font-size: ${fontSizeH6};
    font-weight: bold;
  }
  & tr:nth-child(even) {
    background-color: ${lightestGray};
  }
  & td:nth-child(odd) {
    font-weight: bold;
  }
  & td:nth-child(even) {
    text-align: right;
  }
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
            showRemainingTimeString
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
                  <p>Are you sure you want to hide this listing?</p>
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
                />
              </>
            )}
          </div>
        </FlexContainer>
      </ListingCardHeader>
      <ListingCardBody>
        {listing.type?.toLowerCase().includes('seller') && (
          <ListingDetailsTable>
            <tbody>
              <tr>
                <td>Est. Listing Price:</td>
                <td>
                  {displayDropdownListText(
                    listing.sellersListingPriceInMindPriceRangeInMindId,
                    'priceRanges'
                  )}
                </td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{listing.sellersCity?.name}</td>
              </tr>
              <tr>
                <td>Mortgage Balance:</td>
                <td>{displayDropdownListText(listing.sellersMortgageBalanceId, 'priceRanges')}</td>
              </tr>
              <tr>
                <td>Timeline:</td>
                <td>{listing.sellersTimeline}</td>
              </tr>
              <tr>
                <td>Home Type:</td>
                <td>{displayDropdownListText(listing.sellerTypeOfHomeId, 'homeTypes')}</td>
              </tr>
            </tbody>
          </ListingDetailsTable>
        )}
        {listing.type === 'buyerSeller' && <HorizontalRule />}
        {listing.type?.includes('buyer') && (
          <ListingDetailsTable>
            <tbody>
              <tr>
                <td>Est. Purchase Price:</td>
                <td>{displayDropdownListText(listing.buyingPriceRangeId, 'priceRanges')}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>
                  {Array.isArray(listing.buyingCities) &&
                    listing.buyingCities.length > 0 &&
                    Array(listing.buyingCities.map((city) => city.name))
                      .toString()
                      .replace(/,/g, ', ')}
                </td>
              </tr>
              <tr>
                <td>Home Type:</td>
                <td>{displayDropdownListText(listing.buyerTypeOfHomeId, 'homeTypes')}</td>
              </tr>
            </tbody>
          </ListingDetailsTable>
        )}
      </ListingCardBody>
      <ListingCardFooter>
        <Button
          type="link"
          to={`/agent/listings/${listingType}/${listing.id}`}
          block
          color="tertiary"
        >
          {listingType === 'new' ? 'Place Bid' : 'View My Bid'}
        </Button>
      </ListingCardFooter>
    </ListingCardWrapper>
  );
};

export default ListingCard;
