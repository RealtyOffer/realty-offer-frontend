import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { RouteComponentProps } from '@reach/router';

import { Heading, Box, Input, Button } from '../../../../components';

import { requiredPassword, passwordRulesString } from '../../../../utils/validations';

type AgentSecurityProps = {} & RouteComponentProps;

const AgentSecurity: FunctionComponent<AgentSecurityProps> = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  return (
    <Box>
      <Heading>Security</Heading>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form>
            <Field
              as={Input}
              type="password"
              name="currentPassword"
              label="Current Password"
            />
            <Field
              as={Input}
              type="password"
              name="newPassword"
              label="New Password"
              validate={requiredPassword}
              helpText={passwordRulesString}
            />
            <Field
              as={Input}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <Button type="submit" color="text" block>Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AgentSecurity;
