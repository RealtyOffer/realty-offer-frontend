import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useSelector } from 'react-redux';

import { Heading, ConsumerListingCard, Seo, LoadingPage } from '../../../components';
import { RootState } from '../../../redux/ducks';

type ConsumerListingProps = {} & RouteComponentProps;

const ConsumerListing: FunctionComponent<ConsumerListingProps> = () => {
  const consumer = useSelector((state: RootState) => state.consumer);
  return (
    <>
      <Seo title="My Listings" />
      <Heading as="h2">My Listings</Heading>
      {consumer.isLoading ? <LoadingPage /> : <ConsumerListingCard consumer={consumer} />}
    </>
  );
};

export default ConsumerListing;
