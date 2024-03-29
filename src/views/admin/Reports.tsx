import React, { useEffect, FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { Seo, LoadingPage, Heading, HorizontalRule, Table } from '../../components';
import {
  getAgentsByCity,
  getAgentsByCounty,
  getAwardedBidsByDate,
  getListingsByType,
  getProfilesByDate,
} from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';

const Reports: FunctionComponent<RouteComponentProps> = () => {
  const metrics = useSelector((state: RootState) => state.admin.metrics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentsByCity());
    dispatch(getAgentsByCounty());
    dispatch(getAwardedBidsByDate());
    dispatch(getListingsByType());
    dispatch(getProfilesByDate());
  }, []);

  return (
    <>
      <Seo title="Reports" />
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
      <HorizontalRule />
      <Heading styledAs="sectionHeading">User Counts By Date</Heading>
      {metrics.profilesByDate.isLoading && metrics.profilesByDate.values.length === 0 && (
        <LoadingPage />
      )}
      {!metrics.profilesByDate.isLoading && metrics.profilesByDate.values.length > 0 && (
        <>
          <Table
            columns={[
              { header: 'Last Week', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.profilesByDate.values[0].metrics}
            hasSorting
          />
          <Table
            columns={[
              { header: 'Last Month', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.profilesByDate.values[1].metrics}
            hasSorting
          />
          <Table
            columns={[
              { header: 'Total', accessor: 'name' },
              { header: 'Count', accessor: 'count' },
            ]}
            data={metrics.profilesByDate.values[2].metrics}
            hasSorting
          />
        </>
      )}
    </>
  );
};

export default Reports;
