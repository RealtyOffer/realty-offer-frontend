import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';

import { PageContainer, Button, Card, Input, HorizontalRule, Seo } from '../components';

import { requiredEmail } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { forgotPassword } from '../redux/ducks/auth';
import { addAlert } from '../redux/ducks/globalAlerts';
import { RootState } from '../redux/ducks';
import trackEvent from '../utils/analytics';

type ForgotPasswordProps = {};

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const initialValues = {
    email: '',
  };

  return (
    <PageContainer>
      <Seo title="Forgot Password" />
      <Card cardTitle="Forgot Password?">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            trackEvent('Forgot Password Submitted', {
              user: values.email,
            });

            dispatch(forgotPassword(values)).then((response: ActionResponseType) => {
              if (response && !response.error) {
                setSubmitting(false);
                dispatch(
                  addAlert({
                    message:
                      'If your email is found, you will receive a code for resetting your password.',
                    type: 'success',
                  })
                );
                navigate('/reset-password');
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
                required
              />
              <HorizontalRule />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                block
                isLoading={isSubmitting || auth.isLoading}
              >
                {isSubmitting || auth.isLoading ? 'Submitting' : 'Submit'}
              </Button>
              <Button type="link" to="/login" color="text" block>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </PageContainer>
  );
};

export default ForgotPassword;
