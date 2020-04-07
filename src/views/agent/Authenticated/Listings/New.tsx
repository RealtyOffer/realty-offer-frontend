import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import addHours from 'date-fns/addHours';

import { BidCard, Column, EmptyListingsView, Heading, Seo, Row } from '../../../../components';

const NewListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="New Listings" />
    <Heading>New Listings</Heading>
    {true && (
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
            priceRange="$350-375k"
            type="selling"
            location="48178"
            expiresAt={addHours(new Date(), 22)}
          />
        </Column>
        <Column sm={6} lg={4}>
          <BidCard
            priceRange="$350-375k"
            type="buying"
            location={['48170', '48152']}
            expiresAt={addHours(new Date(), 1)}
          />
        </Column>
      </Row>
    )}
  </>
);

export default NewListings;
