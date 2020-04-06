import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';

import { Heading, Box, Input, Button } from '../../../../components';

type AgentNotificationsProps = {} & RouteComponentProps;

const AgentNotifications: FunctionComponent<AgentNotificationsProps> = () => {
  const initialValues = {
    email: '',
  };
  return (
    <>
      <Heading>Notifications</Heading>
      <Box>
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {() => (
            <Form>
              <Field as={Input} type="text" name="email" label="Email" />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};
export default AgentNotifications;
