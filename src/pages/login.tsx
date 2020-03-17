import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button, Card, Input, HorizontalRule, Seo,
} from '../components';

import { requiredField } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { authenticateCredentials } from '../redux/ducks/auth';

type LoginProps = {
  actions: {
    authenticateCredentials: Function,
  },
};

export type LoginFormValues = {
  email: string;
  password: string;
}

const Login: FunctionComponent<LoginProps> = (props) => {
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <Seo title="Log In" />
      <Card cardTitle="Log In">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values: LoginFormValues, { setSubmitting }) => {
            props.actions.authenticateCredentials(values)
              .then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  // TODO push to user type
                  navigate('/agent/listings/new');
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
                validate={requiredField}
              />
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
    </>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ authenticateCredentials }, dispatch),
  }),
)(Login);
