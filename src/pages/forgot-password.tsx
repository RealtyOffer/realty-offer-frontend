import React, { useState, FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Alert, Button, Card, Input, HorizontalRule, Seo } from '../components';

import { requiredEmail } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { forgotPassword } from '../redux/ducks/auth';

type LoginProps = {
  actions: {
    forgotPassword: Function;
  };
};

const ForgotPassword: FunctionComponent<LoginProps> = props => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    email: '',
  };

  return (
    <>
      <Seo title="Forgot Password" />
      <Card cardTitle="Forgot Password?">
        {!submitted ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              props.actions.forgotPassword(values).then((response: ActionResponseType) => {
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
          <>
            <Alert type="success">
              If your email is found, you will receive an email with next steps for resetting your
              password.
            </Alert>
            <Button type="link" to="/login" color="text" block>
              Back to Login
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

export default connect(null, dispatch => ({
  actions: bindActionCreators({ forgotPassword }, dispatch),
}))(ForgotPassword);
