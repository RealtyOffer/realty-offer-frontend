import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import addHours from 'date-fns/addHours';

import { BidCard, Column, Heading, Seo, Row } from '../../../../components';

const NewListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="New Listings" />
    <Heading>New Listings</Heading>
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
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="selling"
          location="48178"
          expiresAt={addHours(new Date(), 10)}
        />
      </Column>
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="buying"
          location={['48170', '48152']}
          expiresAt={addHours(new Date(), 13)}
        />
      </Column>
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
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="selling"
          location="48178"
          expiresAt={addHours(new Date(), 10)}
        />
      </Column>
      <Column sm={6} lg={4}>
        <BidCard
          priceRange="$350-375k"
          type="buying"
          location={['48170', '48152']}
          expiresAt={addHours(new Date(), 13)}
        />
      </Column>
    </Row>
  </>
);

export default NewListings;
