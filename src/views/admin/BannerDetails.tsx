import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Form, Field } from 'formik';

import { Heading, Input, Row, Column } from '../../components';

type BannerDetailsProps = {
  id?: number;
} & RouteComponentProps;

const BannerDetails: FunctionComponent<BannerDetailsProps> = (props) => {
  const stylingOptions = [
    { value: 'success', label: 'Success' },
    { value: 'info', label: 'info' },
    { value: 'danger', label: 'Danger' },
  ];

  const dismissableOptions = [
    { value: true, label: 'true' },
    { value: false, label: 'false' },
  ];

  const audienceOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'consumer', label: 'Consumer' },
    { value: 'both', label: 'Both' },
  ];

  return (
    <>
      <Heading as="h2">Edit Banner</Heading>
      <Formik
        validateOnMount
        initialValues={props.location?.state || {}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ ...rest }) => (
          <Form>
            <Row>
              <Column md={6}>
                <Field as={Input} name="message" type="text" label="Message" />
              </Column>
              <Column md={6}>
                <Field as={Input} name="callToActionLink" type="text" label="Call to Action Link" />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="styling"
                  type="select"
                  options={stylingOptions}
                  label="Type"
                  {...rest}
                />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="dismissable"
                  type="select"
                  options={dismissableOptions}
                  label="Dismissable"
                  {...rest}
                />
              </Column>
              <Column md={3}>
                <Field as={Input} name="expirationDate" type="date" label="Expiration Date" />
              </Column>
              <Column md={3}>
                <Field
                  as={Input}
                  name="audience"
                  type="select"
                  options={audienceOptions}
                  label="Audience"
                  {...rest}
                />
              </Column>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BannerDetails;
