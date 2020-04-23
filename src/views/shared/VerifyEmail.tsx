/* eslint-disable import/no-cycle, jsx-a11y/label-has-associated-control */
import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { RouteComponentProps } from '@reach/router';
import { Button, Input, FlexContainer, Card, Seo, HorizontalRule } from '../../components';
import { verifyEmail, resendSignupEmail } from '../../redux/ducks/auth';
import { requiredField, requiredEmail } from '../../utils/validations';
import { ActionResponseType } from '../../redux/constants';

declare const document: Document;

type VerifyEmailType = {};

const VerifyEmail: FunctionComponent<VerifyEmailType & RouteComponentProps> = (props) => {
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  };

  const resend = (email: string) => {
    dispatch(resendSignupEmail(email));
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

  const isAgent = props.location?.pathname.includes('agent');

  return (
    <Card
      cardTitle={verified ? 'Verified!' : 'Verify Email Address'}
      cardSubtitle={
        verified
          ? 'You have successfully verified your email. You are one step closer to connecting!'
          : 'Please enter your email address and the 6 digit code sent to verify your account.'
      }
    >
      <Seo title="Verify Email" />
      {verified ? (
        <FlexContainer>
          <Button type="link" to={isAgent ? '/agent/agent-information' : '/login'}>
            {isAgent ? 'Continue' : 'Log In'}
          </Button>
        </FlexContainer>
      ) : (
        <FlexContainer>
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const { digit1, digit2, digit3, digit4, digit5, digit6 } = values;
              const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
              dispatch(
                verifyEmail({
                  email: values.email,
                  confirmationCode: combined,
                })
              ).then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  setVerified(true);
                }
              });
            }}
          >
            {({ isSubmitting, isValid, values, setFieldValue, validateForm }) => (
              <Form style={{ width: '100%' }}>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  label="Email Address"
                  validate={requiredEmail}
                />
                <label>Verification Code</label>
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
                    />
                  ))}
                </FlexContainer>
                <FlexContainer>
                  <Button
                    block
                    type="submit"
                    disabled={isSubmitting || !isValid || values === initialValues}
                  >
                    Confirm Email
                  </Button>
                  <Button type="link" to="/" color="text" block>
                    Cancel
                  </Button>
                </FlexContainer>
                <HorizontalRule />
                <FlexContainer flexDirection="column">
                  <p style={{ textAlign: 'center' }}>
                    Didn&apos;t receive an email? Enter your email address and click the button
                    below to receive a new verification code.
                  </p>
                  <Button
                    type="button"
                    disabled={!values.email}
                    onClick={() => resend(values.email)}
                    color="primaryOutline"
                  >
                    Send Another code
                  </Button>
                </FlexContainer>
              </Form>
            )}
          </Formik>
        </FlexContainer>
      )}
    </Card>
  );
};

export default VerifyEmail;
