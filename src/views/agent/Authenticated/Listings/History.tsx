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

import { getHistoryListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const ListingHistory: FunctionComponent<RouteComponentProps> = () => {
  const historyListings = useSelector((state: RootState) => state.listings.history);
  const awardedListings = useSelector((state: RootState) => state.listings.awarded);
  const isLoading = useSelector((state: RootState) => state.listings.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryListings());
  }, []);

  return (
    <>
      <Seo title="Listing History" />
      <Heading>Listing History</Heading>
      {isLoading && <ListingCardsLoader />}
      {historyListings && historyListings.length > 0 && !isLoading && (
        <Row>
          {historyListings.map((listing) => (
            <Column sm={6} lg={4} key={listing.id}>
              <ListingCard
                listing={listing}
                listingType="history"
                awarded={awardedListings.some((l) => l.id === listing.id)}
              />
            </Column>
          ))}
        </Row>
      )}
      {historyListings && historyListings.length === 0 && !isLoading && (
        <EmptyListingsView
          title="You have not bid on any listings yet!"
          buttonText="See New Listings"
          to="/agent/listings/new"
        />
      )}
    </>
  );
};

export default ListingHistory;
