import React, { useMemo, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { Button, FlexContainer, Heading, Table } from '../../components';
import { getAllCities } from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';
import CityDetails from './CityDetails';

const Cities: FunctionComponent<RouteComponentProps> = () => {
  const cities = useSelector((state: RootState) => state.admin.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCities());
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'City Name',
        accessor: 'name', // accessor is the "key" in the data
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

  const data = cities?.map((city) => {
    return {
      ...city,
      actions: [{ label: 'edit', to: `/admin/cities/${city.id}` }],
    };
  });

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>Cities</Heading>
        <Button type="link" to="/admin/cities/new">
          Add New City
        </Button>
      </FlexContainer>
      {data && <Table columns={columns} data={data} />}
      <Router>
        <CityDetails path="/:id" />
        <CityDetails path="/new" />
      </Router>
    </>
  );
};

export default Cities;
