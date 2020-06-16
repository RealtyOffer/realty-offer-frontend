import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { Row, Column, ListingCard, EmptyListingsView, Heading, Seo } from '../../../../components';

import { getAwardedListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const AwardedListings: FunctionComponent<RouteComponentProps> = () => {
  const awardedListings = useSelector((state: RootState) => state.listings.awarded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAwardedListings());
  }, []);

  return (
    <>
      <Seo title="Awarded Listings" />
      <Heading>Awarded Listings</Heading>
      {awardedListings && awardedListings.length > 0 ? (
        <Row>
          {awardedListings.map((listing) => (
            <Column sm={6} lg={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Column>
          ))}
        </Row>
      ) : (
        <EmptyListingsView
          title="You have not won any bids at this time."
          buttonText="See New Listings"
          to="/agent/listings/new"
        />
      )}
    </>
  );
};

export default AwardedListings;
