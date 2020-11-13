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
      <Heading>Reports</Heading>
      <Heading styledAs="sectionHeading">Agents By City</Heading>
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
          hasSorting
        />
      )}
      <HorizontalRule />
      <Heading styledAs="sectionHeading">Agents By County</Heading>
      {metrics.agentsByCounty.isLoading ? (
        <LoadingPage />
      ) : (
        <Table
          columns={[
            { header: 'County Name', accessor: 'name' },
            { header: 'Count', accessor: 'count' },
          ]}
          data={metrics.agentsByCounty.values}
          hasSorting
        />
      )}
      <HorizontalRule />
      <Heading styledAs="sectionHeading">Awarded Bids By Date</Heading>
      {metrics.awardedBidsByDate.isLoading ? (
        <LoadingPage />
      ) : (
        <Table
          columns={[
            { header: 'Date', accessor: 'name' },
            { header: 'Count', accessor: 'count' },
          ]}
          data={metrics.awardedBidsByDate.values}
          hasSorting
        />
      )}
      <HorizontalRule />
      <Heading styledAs="sectionHeading">Listings By Type</Heading>
      {metrics.listingsByType.isLoading ? (
        <LoadingPage />
      ) : (
        <Table
          columns={[
            { header: 'Listing Type', accessor: 'name' },
            { header: 'Count', accessor: 'count' },
          ]}
          data={metrics.listingsByType.values}
          hasSorting
        />
      )}
    </>
  );
};

export default Banners;
