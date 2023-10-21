import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';

import { PageContainer, Button, Card, Input, HorizontalRule, Seo } from '../components';

import {
  requiredField,
  requiredPassword,
  passwordRulesString,
  requiredEmail,
} from '../utils/validations';
import { ActionResponseType } from '../redux/constants';
import { resetPassword } from '../redux/ducks/auth';
import { addAlert } from '../redux/ducks/globalAlerts';
import { RootState } from '../redux/ducks';
import trackEvent from '../utils/analytics';

type ResetPasswordProps = {};

const ResetPassword: FunctionComponent<ResetPasswordProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const initialValues = {
    email: '',
    newPassword: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
    token: '',
  };

  // const autoFocusNextInput = (e: SyntheticEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.value.length >= 1) {
  //     const currentInputIndex = Number(target.name.charAt(5));
  //     const inputToBeFocused = document.getElementsByName(`digit${currentInputIndex + 1}`)[0];
  //     if (inputToBeFocused) {
  //       inputToBeFocused.focus();
  //     }
  //   }
  // };

  // const handlePasteEvent = (e: ClipboardEvent, setFieldValue: Function, validateForm: Function) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   const pastedData = e.clipboardData && e.clipboardData.getData('Text');

  //   if (pastedData && pastedData.toString().length === 6) {
  //     setFieldValue('digit1', pastedData[0]);
  //     setFieldValue('digit2', pastedData[1]);
  //     setFieldValue('digit3', pastedData[2]);
  //     setFieldValue('digit4', pastedData[3]);
  //     setFieldValue('digit5', pastedData[4]);
  //     setFieldValue('digit6', pastedData[5]);
  //     const inputToBeFocused = document.getElementsByName('digit6')[0];
  //     if (inputToBeFocused) {
  //       validateForm().then(() => inputToBeFocused.focus());
  //     }
  //   }
  // };

  return (
    <PageContainer>
      <Seo title="Reset Password" />
      <Card
        cardTitle="Reset Password"
        cardSubtitle="We've sent a 6 digit code to your email. Enter it below to update your password."
      >
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // const { digit1, digit2, digit3, digit4, digit5, digit6 } = values;
            // const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
            dispatch(
              resetPassword({
                ...values,
                token: String(values.token),
              })
            ).then((response: ActionResponseType) => {
              setSubmitting(false);
              if (response && !response.error) {
                trackEvent('Reset Password', {
                  user: values.email,
                });

                dispatch(
                  addAlert({
                    type: 'success',
                    message: 'You have successfully updated your password. You may now login.',
                  })
                );
                navigate('/login');
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
                required
              />
              {/* <label htmlFor="digit1">
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
              </label> */}
              <Field
                as={Input}
                type="number"
                maxLength={6}
                name="token"
                label="Verification Code"
                validate={requiredField}
                required
              />
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
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                block
                isLoading={isSubmitting || auth.isLoading}
              >
                {isSubmitting || auth.isLoading ? 'Submitting' : 'Submit'}
              </Button>
              <Button type="link" to="/login" color="text" block>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </PageContainer>
  );
};

export default ResetPassword;
