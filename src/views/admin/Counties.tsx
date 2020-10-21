import React, { useMemo, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingPage, Button, FlexContainer, Heading, Table } from '../../components';
import { getAllCounties } from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';
import CountyDetails from './CountyDetails';
import numberWithCommas from '../../utils/numberWithCommas';

const Counties: FunctionComponent<RouteComponentProps> = () => {
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCounties());
  }, []);

  const countyColumns = useMemo(
    () => [
      {
        header: 'County Name',
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

  const countyData = admin.counties?.map((county) => {
    return {
      ...county,
      monthlyPrice: `$${numberWithCommas(county.monthlyPrice)}`,
      actions: [{ label: 'edit', to: `/admin/counties/${county.id}` }],
    };
  });

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>Counties</Heading>
        <Button type="link" to="/admin/counties/new">
          Add New County
        </Button>
      </FlexContainer>
      {admin.isLoading ? <LoadingPage /> : <Table columns={countyColumns} data={countyData} />}

      <Router>
        <CountyDetails path="/:id" />
        <CountyDetails path="/new" />
      </Router>
    </>
  );
};

export default Counties;
