import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import {
  Formik, Field, Form, FormikProps, FieldProps, FieldMetaProps, FormikFormProps,
} from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Alert, Box, Button, Column, Header, Input, Layout, Row, HorizontalRule, FlexContainer,
} from '../components';

import { requiredField, requiredPassword, passwordRulesString } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { resetPassword } from '../redux/ducks/auth';

type ResetPasswordProps = {
  actions: {
    resetPassword: Function,
  },
};

export type ResetPasswordFormValues = {
  email: string;
  newPassword: string;
  token: string;
}

const ResetPassword: FunctionComponent<ResetPasswordProps> = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = {
    email: '',
    newPassword: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  };

  const focusChange = (e: SyntheticEvent) => { // SyntheticInputEvent not supported by TS yet
    const target = e.target as HTMLInputElement;
    if (target.value.length >= 1) {
      const currentInputIndex = Number(target.name.charAt(5));
      document.getElementsByName(`digit${currentInputIndex + 1}`)[0].focus();
    }
  };

  return (
    <Layout>
      <Row>
        <Column md={6} mdOffset={3}>
          <Box>
            <Header align="center">Reset Password</Header>
            {
              !submitted ? (
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, { setSubmitting }) => {
                    const {
                      digit1, digit2, digit3, digit4, digit5, digit6,
                    } = values;
                    const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
                    props.actions.resetPassword({
                      ...values,
                      token: combined,
                    })
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
                      <label>Verification Code</label>
                      <FlexContainer justifyContent="space-between" flexWrap="nowrap">
                        <Field
                          as={Input}
                          type="text"
                          name="digit1"
                          square
                          maxLength={1}
                          onInput={(e: SyntheticEvent) => focusChange(e)}
                          validate={requiredField}
                        />
                        <Field
                          as={Input}
                          type="text"
                          name="digit2"
                          square
                          maxLength={1}
                          onInput={(e: SyntheticEvent) => focusChange(e)}
                          validate={requiredField}
                        />
                        <Field
                          as={Input}
                          type="text"
                          name="digit3"
                          square
                          maxLength={1}
                          onInput={(e: SyntheticEvent) => focusChange(e)}
                          validate={requiredField}
                        />
                        <Field
                          as={Input}
                          type="text"
                          name="digit4"
                          square
                          maxLength={1}
                          onInput={(e: SyntheticEvent) => focusChange(e)}
                          validate={requiredField}
                        />
                        <Field
                          as={Input}
                          type="text"
                          name="digit5"
                          square
                          maxLength={1}
                          onInput={(e: SyntheticEvent) => focusChange(e)}
                          validate={requiredField}
                        />
                        <Field
                          as={Input}
                          type="text"
                          name="digit6"
                          square
                          maxLength={1}
                          validate={requiredField}
                        />
                      </FlexContainer>
                      <Field
                        name="newPassword"
                        validate={requiredPassword}
                      >
                        {({
                          field, form, meta,
                        }: {
                          field: FieldProps, form: FormikFormProps, meta: FieldMetaProps<any>,
                        }) => (
                          <Input
                            type="password"
                            label="New Password"
                            name="newPassword"
                            helpText={passwordRulesString}
                            {...field}
                            {...form}
                            {...meta}
                          />
                        )}
                      </Field>
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
                    You have successfully reset your password. You may now log in.
                  </Alert>
                  <Button type="link" to="/login" color="primary" block>
                    Log In
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
    actions: bindActionCreators({ resetPassword }, dispatch),
  }),
)(ResetPassword);
