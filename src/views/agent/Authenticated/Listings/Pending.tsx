import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import {
  ListingCardsLoader,
  Row,
  Column,
  ListingCard,
  EmptyListingsView,
  Heading,
  Seo,
} from '../../../../components';

import { getPendingListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const PendingListings: FunctionComponent<RouteComponentProps> = () => {
  const pendingListings = useSelector((state: RootState) => state.listings.pending);
  const isLoading = useSelector((state: RootState) => state.listings.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingListings());
  }, []);

  return (
    <>
      <Seo title="Pending Listings" />
      <Heading>Pending Listings</Heading>
      {isLoading && <ListingCardsLoader />}
      {pendingListings && pendingListings.length > 0 && !isLoading && (
        <Row>
          {pendingListings.map((listing) => (
            <Column md={6} lg={4} key={listing.id}>
              <ListingCard listing={listing} listingType="pending" />
            </Column>
          ))}
        </Row>
      )}
      {pendingListings && pendingListings.length === 0 && !isLoading && (
        <EmptyListingsView
          title="You have no pending bids at this time."
          buttonText="See New Listings"
          to="/agent/listings/new"
        />
      )}
    </>
  );
};

export default PendingListings;
