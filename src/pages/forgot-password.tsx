import React, { useState, FunctionComponent } from 'react';
import {
  Formik, Field, Form, FormikProps,
} from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Alert, Box, Button, Column, Heading, Input, Row, HorizontalRule, Seo,
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
    <>
      <Seo title="Forgot Password" />
      <Row>
        <Column md={6} mdOffset={3}>
          <Box largePadding>
            <Heading align="center">Forgot Password?</Heading>
            {
              !submitted ? (
                <Formik
                  validateOnMount
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
    </>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ forgotPassword }, dispatch),
  }),
)(ForgotPassword);
