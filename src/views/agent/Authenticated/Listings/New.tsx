import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { ListingCard, Column, EmptyListingsView, Heading, Seo, Row } from '../../../../components';

import { getNewListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const NewListings: FunctionComponent<RouteComponentProps> = () => {
  const newListings = useSelector((state: RootState) => state.listings.new);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewListings());
  }, []);

  return (
    <>
      <Seo title="New Listings" />
      <Heading>New Listings</Heading>
      {newListings && newListings.length > 0 ? (
        <Row>
          {newListings.map((listing) => (
            <Column sm={6} lg={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Column>
          ))}
        </Row>
      ) : (
        <EmptyListingsView
          title="There are no new bids in your current sales area."
          buttonText="Add More Cities"
          to="/agent/account/settings"
        />
      )}
    </>
  );
};

export default NewListings;
