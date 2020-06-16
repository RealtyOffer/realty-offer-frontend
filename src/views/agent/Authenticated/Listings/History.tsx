import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { Row, Column, ListingCard, EmptyListingsView, Heading, Seo } from '../../../../components';

import { getHistoryListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const ListingHistory: FunctionComponent<RouteComponentProps> = () => {
  const historyListings = useSelector((state: RootState) => state.listings.history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistoryListings());
  }, []);

  return (
    <>
      <Seo title="Listing History" />
      <Heading>Listing History</Heading>
      {historyListings && historyListings.length > 0 ? (
        <Row>
          {historyListings.map((listing) => (
            <Column sm={6} lg={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Column>
          ))}
        </Row>
      ) : (
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
