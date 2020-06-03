import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';

import { PageContainer, Button, Card, Input, HorizontalRule, Seo } from '../components';

import { requiredField } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { authenticateCredentials } from '../redux/ducks/auth';

type LoginProps = {};

type LoginResponseType = {
  payload: {
    roles: 'Agent' | 'Consumer';
  };
};

const Login: FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <PageContainer>
      <Seo title="Log In" />
      <Card cardTitle="Log In">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(authenticateCredentials(values)).then(
              (response: ActionResponseType | LoginResponseType) => {
                setSubmitting(false);
                if ((response as ActionResponseType) && !(response as ActionResponseType).error) {
                  if ((response as LoginResponseType).payload.roles.includes('Agent')) {
                    navigate('/agent');
                  }
                  if ((response as LoginResponseType).payload.roles.includes('Consumer')) {
                    navigate('/consumer/home');
                  }
                }
              }
            );
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field as={Input} type="email" name="email" label="Email" validate={requiredField} />
              <Field
                as={Input}
                type="password"
                name="password"
                label="Password"
                validate={requiredField}
              />
              <HorizontalRule />
              <Button type="submit" disabled={isSubmitting || !isValid} block>
                Log In
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
