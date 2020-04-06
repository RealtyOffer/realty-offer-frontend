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
    <>
      <Heading>Security</Heading>
      <Box>
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Field as={Input} type="password" name="currentPassword" label="Current Password" />
              <Field
                as={Input}
                type="password"
                name="newPassword"
                label="New Password"
                validate={requiredPassword}
                helpText={passwordRulesString}
              />
              <Field as={Input} type="password" name="confirmPassword" label="Confirm Password" />
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AgentSecurity;
