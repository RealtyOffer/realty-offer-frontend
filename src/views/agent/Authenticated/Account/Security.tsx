import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { RouteComponentProps } from '@reach/router';
import { FaLock } from 'react-icons/fa';

import { Heading, Box, Input, Button } from '../../../../components';

import { requiredPassword, passwordRulesString } from '../../../../utils/validations';
import AutoSave from '../../../../utils/autoSave';

type AgentSecurityProps = {} & RouteComponentProps;

const AgentSecurity: FunctionComponent<AgentSecurityProps> = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  return (
    <Box>
      <Heading as="h2">Password</Heading>
      {showPasswordForm ? (
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {() => (
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
              <AutoSave />
            </Form>
          )}
        </Formik>
      ) : (
        <Button
          type="button"
          onClick={() => setShowPasswordForm(true)}
          color="primaryOutline"
          iconLeft={<FaLock />}
        >
          Update Password
        </Button>
      )}
    </Box>
  );
};

export default AgentSecurity;
