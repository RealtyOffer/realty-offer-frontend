import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import addHours from 'date-fns/addHours';

import { BidCard, Column, EmptyListingsView, Heading, Seo, Row } from '../../../../components';

import { getListings } from '../../../../redux/ducks/listings';
import { RootState } from '../../../../redux/ducks';

const NewListings: FunctionComponent<RouteComponentProps> = () => {
  const listings = useSelector((state: RootState) => state.listings);
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
      {true && (
        <Row>
          <Column sm={6} lg={4}>
            <BidCard
              listing={{
                id: 1,
                type: 'seller',
                sellersListingPriceInMind: '$350-375k',
                sellersCity: 'Livonia',
                createDateTime: addHours(new Date(), 22),
              }}
            />
          </Column>
          <Column sm={6} lg={4}>
            <BidCard
              listing={{
                id: 2,
                type: 'buyer',
                buyingPriceRange: '$350-375k',
                buyingCities: ['Plymouth', 'Livonia', 'Novi', 'Canton', 'Northville'],
                createDateTime: addHours(new Date(), 1),
              }}
            />
          </Column>
          <Column sm={6} lg={4}>
            <BidCard
              listing={{
                id: 3,
                type: 'buyerSeller',
                sellersListingPriceInMind: '$350-375k',
                sellersCity: 'Livonia',
                buyingPriceRange: '$350-375k',
                buyingCities: ['Plymouth', 'Livonia'],
                createDateTime: addHours(new Date(), 3),
              }}
            />
          </Column>
        </Row>
      )}
    </>
  );
};

export default NewListings;
