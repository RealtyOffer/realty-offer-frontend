import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { EmptyListingsView, Heading, Seo } from '../../../../components';

const PendingListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Pending Listings" />
    <Heading>Pending Listings</Heading>
    {true && ( // TODO: look at pending listings length to show this dynamically
      <EmptyListingsView
        title="You have no pending bids at this time."
        buttonText="See New Listings"
        to="/agent/listings/new"
      />
    )}
  </>
);

export default PendingListings;
