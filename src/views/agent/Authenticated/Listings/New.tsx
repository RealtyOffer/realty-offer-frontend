import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import addHours from 'date-fns/addHours';

import { BidCard, Column, Heading, Seo, Row } from '../../../../components';

const NewListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="New Listings" />
    <Heading>New Listings</Heading>
    <Row>
      <Column md={4}>
        <BidCard
          index={1}
          total={25}
          priceRange="$350-375k"
          type="selling"
          location="48178"
          expiresAt={String(addHours(new Date(), 22))}
        />
      </Column>
      <Column md={4}>
        <BidCard
          index={2}
          total={25}
          priceRange="$350-375k"
          type="buying"
          location={['48170', '48152']}
          expiresAt={String(addHours(new Date(), 23))}
        />
      </Column>
    </Row>
  </>
);

export default NewListings;
