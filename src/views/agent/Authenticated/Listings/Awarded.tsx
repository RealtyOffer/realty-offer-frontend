import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { EmptyListingsView, Heading, Seo } from '../../../../components';

const AwardedListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="Awarded Listings" />
    <Heading>Awarded Listings</Heading>
    {true && ( // TODO: look at awarded listings length to show this dynamically
      <EmptyListingsView
        title="You have not won any bids at this time."
        buttonText="See New Listings"
        to="/agent/listings/new"
      />
    )}
  </>
);

export default AwardedListings;
