import React, { FunctionComponent } from 'react';
import {
  Formik, Field, Form, FormikProps, FieldProps, FieldMetaProps, FormikFormProps,
} from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Box, Button, Column, Header, Input, Layout, Row, HorizontalRule,
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
    <Layout>
      <Row>
        <Column md={6} mdOffset={3}>
          <Box largePadding>
            <Header align="center">Log In</Header>
            <Formik
              initialValues={initialValues}
              onSubmit={(values: LoginFormValues, { setSubmitting }) => {
                props.actions.authenticateCredentials(values)
                  .then((response: ActionResponseType) => {
                    setSubmitting(false);
                    if (response && !response.error) {
                      // TODO push to user type
                      navigate('/agent/');
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
                  <Field
                    name="password"
                    validate={requiredField}
                  >
                    {({
                      field, form, meta,
                    }: {
                      field: FieldProps, form: FormikFormProps, meta: FieldMetaProps<any>,
                    }) => (
                      <Input
                        type="password"
                        label="Password"
                        name="password"
                        {...field}
                        {...form}
                        {...meta}
                      />
                    )}
                  </Field>
                  <HorizontalRule />
                  <Button type="submit" disabled={formikProps.isSubmitting || !formikProps.isValid} block>
                    Log In
                  </Button>
                </Form>
              )}
            </Formik>
            <Button type="link" to="/forgot-password" color="text" block>
              Forgot Password?
            </Button>
          </Box>
        </Column>
      </Row>
    </Layout>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ authenticateCredentials }, dispatch),
  }),
)(Login);
