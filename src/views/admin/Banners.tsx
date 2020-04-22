import React, { useMemo, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';

import { Button, FlexContainer, Heading, Table } from '../../components';
import { getAllSiteBanners } from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';
import BannerDetails from './BannerDetails';

const Banners: FunctionComponent<RouteComponentProps> = () => {
  const banners = useSelector((state: RootState) => state.admin.banners);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSiteBanners());
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Message',
        accessor: 'message', // accessor is the "key" in the data
      },
      {
        header: 'Type',
        accessor: 'styling',
      },
      {
        header: 'Dismissable',
        accessor: 'dismissable',
      },
      {
        header: 'Call To Action Link',
        accessor: 'callToActionLink',
      },
      {
        header: 'Expires',
        accessor: 'expirationDate',
      },
      {
        header: 'Audience',
        accessor: 'audience',
      },
      {
        header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const data = banners?.map((banner) => {
    return {
      ...banner,
      dismissable: banner.dismissable.toString(),
      expirationDate: format(new Date(banner.expirationDate), 'MM/dd/yyyy hh:mm:ssaa'),
      actions: [{ label: 'edit', to: `/admin/banners/${banner.id}` }],
    };
  });

  return (
    <>
      <FlexContainer justifyContent="space-between">
        <Heading>Site Banners</Heading>
        <Button type="link" to="/admin/banners/new">
          Add New Banner
        </Button>
      </FlexContainer>
      {data && <Table columns={columns} data={data} />}
      <Router>
        <BannerDetails path="/:id" />
        <BannerDetails path="/new" />
      </Router>
    </>
  );
};

export default Banners;
