import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { BidCard, Column, EmptyListingsView, Heading, Seo, Row } from '../../../../components';

import { getListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const NewListings: FunctionComponent<RouteComponentProps> = () => {
  const listings = useSelector((state: RootState) => state.listings.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListings('new'));
  }, []);

  return (
    <>
      <Seo title="New Listings" />
      <Heading>New Listings</Heading>
      {false && (
        <EmptyListingsView
          title="There are no new bids in your current sales area."
          buttonText="Add More Cities"
          to="/agent/account/settings"
        />
      ) // TODO: look at new listings length to show this dynamically
      }
      {listings && listings.length > 0 && (
        <Row>
          {listings.map((listing) => (
            <Column sm={6} lg={4} key={listing.id}>
              <BidCard listing={listing} />
            </Column>
          ))}
        </Row>
      )}
    </>
  );
};

export default NewListings;
