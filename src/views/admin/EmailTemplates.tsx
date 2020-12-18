import React, { useMemo, useEffect, FunctionComponent } from 'react';
import { RouteComponentProps, Router } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';

import { Seo, LoadingPage, Button, FlexContainer, Heading, Table } from '../../components';
import { getAllEmailTemplates } from '../../redux/ducks/admin';
import { RootState } from '../../redux/ducks';
import EmailTemplateDetails from './EmailTemplateDetails';

const EmailTemplates: FunctionComponent<RouteComponentProps> = () => {
  const admin = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmailTemplates());
  }, []);

  const emailtemplateColumns = useMemo(
    () => [
      {
        header: 'Email Template Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const emailtemplateData = admin.emailTemplates?.map((template) => {
    return {
      ...template,
      actions: [{ label: 'edit', to: `/admin/email-templates/${template.name}` }],
    };
  });

  return (
    <>
      <Seo title="Email Templates" />
      <FlexContainer justifyContent="space-between">
        <Heading>Email Templates</Heading>
      </FlexContainer>
      {admin.isLoading ? (
        <LoadingPage />
      ) : (
        <Table columns={emailtemplateColumns} data={emailtemplateData} />
      )}
      <Router>
        <EmailTemplateDetails path="/:name" />
        <EmailTemplateDetails path="/new" />
      </Router>
    </>
  );
};

export default EmailTemplates;
