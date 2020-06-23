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

  const handlePasteEvent = (e: ClipboardEvent, setFieldValue: Function, validateForm: Function) => {
    e.stopPropagation();
    e.preventDefault();

    const pastedData = e.clipboardData && e.clipboardData.getData('Text');

    if (pastedData && pastedData.toString().length === 6) {
      setFieldValue('digit1', pastedData[0]);
      setFieldValue('digit2', pastedData[1]);
      setFieldValue('digit3', pastedData[2]);
      setFieldValue('digit4', pastedData[3]);
      setFieldValue('digit5', pastedData[4]);
      setFieldValue('digit6', pastedData[5]);
      const inputToBeFocused = document.getElementsByName('digit6')[0];
      if (inputToBeFocused) {
        validateForm().then(() => inputToBeFocused.focus());
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
            {({ isSubmitting, isValid, setFieldValue, validateForm }) => (
              <Form>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  label="Email"
                  validate={requiredField}
                  required
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
                        onPaste={(e: ClipboardEvent) =>
                          handlePasteEvent(e, setFieldValue, validateForm)
                        }
                        validate={requiredField}
                        required
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
                  required
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
            <Alert
              type="success"
              message="You have successfully reset your password. You may now log in."
            />
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
