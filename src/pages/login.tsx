import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistance, isAfter } from 'date-fns';

import { Alert, PageContainer, Button, Card, Input, HorizontalRule, Seo } from '../components';

import { requiredField } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { authenticateCredentials } from '../redux/ducks/auth';
import { RootState } from '../redux/ducks';
import { removeAttemptedPrivatePage } from '../redux/ducks/user';

type LoginProps = {};

type LoginResponseType = {
  payload: {
    roles: 'Agent' | 'Consumer';
  };
};

const Login: FunctionComponent<LoginProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const inLockoutPeriod =
    auth.lockoutTimestamp && isAfter(new Date(auth.lockoutTimestamp), new Date());
  const dispatch = useDispatch();
  const initialValues = {
    email: auth.email || '',
    password: '',
  };

  return (
    <PageContainer>
      <Seo title="Log In" />
      <Card cardTitle="Log In">
        {auth.failedLoginAttempts >= 3 && auth.failedLoginAttempts < 5 && (
          <Alert
            type="info"
            message="It looks like you are having trouble logging in."
            callToActionLink="/forgot-password"
            callToActionLinkText="Reset your Password"
          />
        )}
        {auth.failedLoginAttempts >= 5 && auth.lockoutTimestamp && inLockoutPeriod && (
          <Alert
            type="danger"
            message={`Your account is now temporarily disabled. You may try logging in again in ${formatDistance(
              new Date(auth.lockoutTimestamp),
              new Date(),
              {
                includeSeconds: true,
              }
            )}.`}
          />
        )}
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(authenticateCredentials(values)).then(
              (response: ActionResponseType | LoginResponseType) => {
                setSubmitting(false);
                if ((response as ActionResponseType) && !(response as ActionResponseType).error) {
                  if ((response as LoginResponseType).payload.roles.includes('Agent')) {
                    if (window && window.analytics) {
                      window.analytics.track('Agent Login', {
                        user: values.email,
                      });
                    }
                    if (user.location) {
                      dispatch(removeAttemptedPrivatePage());
                      navigate(user.location);
                    } else {
                      navigate('/agent');
                    }
                  }
                  if ((response as LoginResponseType).payload.roles.includes('Consumer')) {
                    if (window && window.analytics) {
                      window.analytics.track('Consumer Login', {
                        user: values.email,
                      });
                    }
                    if (user.location) {
                      dispatch(removeAttemptedPrivatePage());
                      navigate(user.location);
                    } else {
                      navigate('/consumer/listing');
                    }
                  }
                }
              }
            );
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field
                as={Input}
                disabled={inLockoutPeriod}
                type="email"
                name="email"
                label="Email"
                validate={requiredField}
                required
              />
              <Field
                as={Input}
                type="password"
                name="password"
                label="Password"
                validate={requiredField}
                required
                disabled={inLockoutPeriod}
              />
              <HorizontalRule />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || inLockoutPeriod}
                block
                isLoading={isSubmitting || auth.isLoading}
              >
                {isSubmitting || auth.isLoading ? 'Logging In' : 'Log In'}
              </Button>
            </Form>
          )}
        </Formik>
        <Button type="link" to="/forgot-password" color="text" block>
          Forgot Password?
        </Button>
      </Card>
    </PageContainer>
  );
};

export default Login;
