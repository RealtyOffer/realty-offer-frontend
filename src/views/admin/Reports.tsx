import React, { useEffect, FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingPage, FlexContainer, Heading, HorizontalRule, Table } from '../../components';
import {
  getAgentsByCity,
  getAgentsByCounty,
  getAwardedBidsByDate,
  getListingsByType,
} from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';

const Banners: FunctionComponent<RouteComponentProps> = () => {
  const metrics = useSelector((state: RootState) => state.admin.metrics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentsByCity());
    dispatch(getAgentsByCounty());
    dispatch(getAwardedBidsByDate());
    dispatch(getListingsByType());
  }, []);

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>Reports</Heading>
      </FlexContainer>
      {metrics.agentsByCity.isLoading ? (
        <LoadingPage />
      ) : (
        <Table
          columns={[
            { header: 'City Name', accessor: 'name' },
            { header: 'Count', accessor: 'count' },
          ]}
          data={metrics.agentsByCity.values}
          hasPagination
        />
      )}
      <HorizontalRule />
      {metrics.agentsByCounty.isLoading ? (
        <LoadingPage />
      ) : (
        <div>{JSON.stringify(metrics.agentsByCounty.values)}</div>
      )}
      <HorizontalRule />
      {metrics.awardedBidsByDate.isLoading ? (
        <LoadingPage />
      ) : (
        <div>{JSON.stringify(metrics.awardedBidsByDate.values)}</div>
      )}
      <HorizontalRule />
      {metrics.listingsByType.isLoading ? (
        <LoadingPage />
      ) : (
        <div>{JSON.stringify(metrics.listingsByType.values)}</div>
      )}
    </>
  );
};

export default Banners;
