import React, { useState, FunctionComponent } from 'react';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Alert, Box, Button, Column, Header, Input, Layout, Row, HorizontalRule,
} from '../components';

import { requiredField } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { forgotPassword } from '../redux/ducks/auth';

type LoginProps = {
  actions: {
    forgotPassword: Function,
  },
};

const ForgotPassword: FunctionComponent<LoginProps> = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    email: '',
  };

  return (
    <Layout>
      <Row>
        <Column md={6} mdOffset={3}>
          <Box>
            <Header align="center">Forgot Password?</Header>
            {
              !submitted ? (
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    props.actions.forgotPassword(values)
                      .then((response: ActionResponseType) => {
                        setSubmitting(false);
                        if (response && !response.error) {
                          setSubmitted(true);
                        }
                      });
                  }}
                >
                  {(formikProps: FormikProps<any>) => (
                    <Form>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        label="Email"
                        validate={requiredField}
                      />
                      <HorizontalRule />
                      <Button type="submit" disabled={formikProps.isSubmitting || !formikProps.isValid} block>
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
                    If your email is found, you will receive an email
                    with next steps for resetting your password.
                  </Alert>
                  <Button type="link" to="/login" color="text" block>
                    Back to Login
                  </Button>
                </>
              )
            }
          </Box>
        </Column>
      </Row>
    </Layout>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ forgotPassword }, dispatch),
  }),
)(ForgotPassword);
