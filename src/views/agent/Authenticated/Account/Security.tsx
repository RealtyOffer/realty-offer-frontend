import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { RouteComponentProps } from '@reach/router';
import { FaLock } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { Heading, Box, Input, Button, Alert } from '../../../../components';

import {
  requiredField,
  requiredPassword,
  passwordRulesString,
} from '../../../../utils/validations';
import { changePassword } from '../../../../redux/ducks/auth';
import { RootState } from '../../../../redux/ducks';
import { ActionResponseType } from '../../../../redux/constants';
import trackEvent from '../../../../utils/analytics';

type AgentSecurityProps = {} & RouteComponentProps;

const AgentSecurity: FunctionComponent<AgentSecurityProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [errorResponse, showErrorResponse] = useState(false);
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
          onSubmit={(values, { setSubmitting }) => {
            dispatch(changePassword(values)).then((response: ActionResponseType) => {
              if (response && !response.error) {
                trackEvent('Agent updated password', {
                  user: auth.email,
                });

                setTimeout(() => {
                  setShowPasswordForm(false);
                }, 2000);
                setSubmitting(false);
              }
              if (response && response.error) {
                showErrorResponse(true);
                setTimeout(() => {
                  showErrorResponse(false);
                }, 5000);
                setSubmitting(false);
              }
            });
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field
                as={Input}
                type="password"
                name="currentPassword"
                label="Current Password"
                required
                validate={requiredField}
              />
              <Field
                as={Input}
                type="password"
                name="newPassword"
                label="New Password"
                validate={requiredPassword}
                required
                helpText={passwordRulesString}
              />
              <Field
                as={Input}
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                validate={requiredPassword}
                required
              />
              {errorResponse && (
                <Alert type="danger" message="Something went wrong, please try again." />
              )}
              <Button type="submit" disabled={!isValid || isSubmitting || auth.isLoading}>
                Submit
              </Button>
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
