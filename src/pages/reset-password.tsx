import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';

import {
  PageContainer,
  Alert,
  Button,
  Card,
  Input,
  HorizontalRule,
  FlexContainer,
  Seo,
} from '../components';

import { requiredField, requiredPassword, passwordRulesString } from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { resetPassword } from '../redux/ducks/auth';

type ResetPasswordProps = {};

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

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

  const autoFocusNextInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length >= 1) {
      const currentInputIndex = Number(target.name.charAt(5));
      const inputToBeFocused = document.getElementsByName(`digit${currentInputIndex + 1}`)[0];
      if (inputToBeFocused) {
        inputToBeFocused.focus();
      }
    }
  };

  return (
    <PageContainer>
      <Seo title="Reset Password" />
      <Card cardTitle="Reset Password">
        {!submitted ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const { digit1, digit2, digit3, digit4, digit5, digit6 } = values;
              const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
              dispatch(
                resetPassword({
                  ...values,
                  token: combined,
                })
              ).then((response: ActionResponseType) => {
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
                  validate={requiredField}
                />
                <label htmlFor="digit1">
                  Verification Code
                  <FlexContainer justifyContent="space-between" flexWrap="nowrap">
                    {['digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6'].map((digit) => (
                      <Field
                        key={digit}
                        as={Input}
                        type="text"
                        name={digit}
                        square
                        maxLength={1}
                        onInput={autoFocusNextInput}
                        validate={requiredField}
                      />
                    ))}
                  </FlexContainer>
                </label>
                <Field
                  as={Input}
                  type="password"
                  label="New Password"
                  name="newPassword"
                  helpText={passwordRulesString}
                  validate={requiredPassword}
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
              You have successfully reset your password. You may now log in.
            </Alert>
            <Button type="link" to="/login" color="primary" block>
              Log In
            </Button>
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default ResetPassword;
