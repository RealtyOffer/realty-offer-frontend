import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { EmptyListingsView, Heading, Seo } from '../../../../components';

const ListingHistory: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Listing History" />
    <Heading>Listing History</Heading>
    {true && ( // TODO: look at listing history length to show this dynamically
      <EmptyListingsView
        title="You have not bid on any listings yet!"
        buttonText="See New Listings"
        to="/agent/listings/new"
      />
    )}
  </>
);

export default ListingHistory;
