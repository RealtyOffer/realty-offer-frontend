import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import { Heading, Seo } from '../../../../components';

const NewListings: FunctionComponent<RouteComponentProps> = () => (
  <>
    <Seo title="New Listings" />
    <Heading>New Listings</Heading>
  </>
);

export default NewListings;
