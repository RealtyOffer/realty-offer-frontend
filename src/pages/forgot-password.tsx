import React, { useState, FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { PageContainer, Alert, Button, Card, Input, HorizontalRule, Seo } from '../components';

import { requiredEmail } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { forgotPassword } from '../redux/ducks/auth';

type LoginProps = {};

const ForgotPassword: FunctionComponent<LoginProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };

  return (
    <PageContainer>
      <Seo title="Forgot Password" />
      <Card cardTitle="Forgot Password?">
        {!submitted ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(forgotPassword(values)).then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  setSubmitted(true);
                }
              });
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  label="Email"
                  validate={requiredEmail}
                />
                <HorizontalRule />
                <Button type="submit" disabled={isSubmitting || !isValid} block>
                  Submit
                </Button>
                <Button type="link" to="/login" color="text" block>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <div data-cy="forgot-password">
            <Alert
              type="success"
              data-cy="alert"
              message="If your email is found, you will receive an email with next steps for resetting your password."
            />
            <Button type="link" to="/login" color="text" block>
              Back to Login
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
};

export default ForgotPassword;
