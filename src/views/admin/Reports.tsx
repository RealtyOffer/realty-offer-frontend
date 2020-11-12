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
        <Heading styledAs="title">Reports</Heading>
      </FlexContainer>
      {metrics.agentsByCity.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Heading styledAs="sectionHeading">Agents by City</Heading>
          <Table
            columns={[
              { header: 'City Name', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.agentsByCity.values}
            hasPagination
          />
        </>
      )}
      <HorizontalRule />
      {metrics.agentsByCounty.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Heading styledAs="sectionHeading">Agents by County</Heading>
          <Table
            columns={[
              { header: 'County Name', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.agentsByCounty.values}
          />
        </>
      )}
      <HorizontalRule />
      {metrics.awardedBidsByDate.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Heading styledAs="sectionHeading">Awarded Bids by date</Heading>
          <Table
            columns={[
              { header: 'Date', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.awardedBidsByDate.values}
          />
        </>
      )}
      <HorizontalRule />
      {metrics.listingsByType.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Heading styledAs="sectionHeading">Listings by Type</Heading>
          <Table
            columns={[
              { header: 'Listing Type', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.listingsByType.values}
          />
        </>
      )}
    </>
  );
};

export default Banners;
