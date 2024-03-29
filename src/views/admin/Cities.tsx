import React, { useMemo, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { Seo, LoadingPage, Button, FlexContainer, Heading, Table } from '../../components';
import { getAllCities, getAllCounties } from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';
import CityDetails from './CityDetails';
import numberWithCommas from '../../utils/numberWithCommas';

const Cities: FunctionComponent<RouteComponentProps> = () => {
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, []);

  useEffect(() => {
    dispatch(getAllCounties());
  }, []);

  const cityColumns = useMemo(
    () => [
      {
        header: 'City Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        header: 'County',
        accessor: 'countyId',
      },
      {
        header: 'State',
        accessor: 'state',
      },
      {
        header: 'Monthly Price',
        accessor: 'monthlyPrice',
      },
      {
        header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const cityData = admin.cities?.map((city) => {
    return {
      ...city,
      countyId: admin.counties?.find((county) => city.countyId === county.id)?.name,
      state: admin.counties?.find((county) => city.countyId === county.id)?.state,
      monthlyPrice: `$${numberWithCommas(city.monthlyPrice)}`,
      actions: [{ label: 'edit', to: `/admin/cities/${city.id}` }],
    };
  });

  return (
    <>
      <Seo title="Cities" />
      <FlexContainer justifyContent="space-between">
        <Heading>Cities</Heading>
        <Button type="link" to="/admin/cities/new">
          Add New City
        </Button>
      </FlexContainer>
      {admin.isLoading ? (
        <LoadingPage />
      ) : (
        <Table columns={cityColumns} data={cityData} hasSorting hasPagination />
      )}
      <Router>
        <CityDetails path="/:id" />
        <CityDetails path="/new" />
      </Router>
    </>
  );
};

export default Cities;
