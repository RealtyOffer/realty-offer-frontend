/* eslint-disable import/no-cycle, jsx-a11y/label-has-associated-control */
import React, { useState, FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from '@reach/router';

import {
  ClientOnly,
  Button,
  Input,
  FlexContainer,
  Card,
  Seo,
  HorizontalRule,
  TimelineProgress,
  Alert,
} from '../../components';
import { verifyEmail, resendSignupEmail } from '../../redux/ducks/auth';
import { requiredField, requiredEmail } from '../../utils/validations';
import { ActionResponseType } from '../../redux/constants';
import { RootState } from '../../redux/ducks';

declare const document: Document;

type VerifyEmailType = {};

const VerifyEmail: FunctionComponent<VerifyEmailType & RouteComponentProps> = () => {
  const [verified, setVerified] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();
  const location = useLocation();

  const initialValues = {
    email: auth.email,
    confirmationCode: '',
  };

  const resend = (email: string) => {
    dispatch(resendSignupEmail(email));
  };

  return (
    <>
      <Seo title="Verify Email" />
      {location.pathname.includes('consumer') ? (
        <TimelineProgress
          items={['Get Started', 'Create Listing', 'Create Account', 'Verify Email']}
          currentStep={4}
        />
      ) : (
        <TimelineProgress
          items={
            agent && agent.signupData.isPilotUser
              ? ['Create Account', 'Verify Email', 'Agent Info', 'Confirm']
              : [
                  'Create Account',
                  'Verify Email',
                  'Agent Info',
                  'Business Info',
                  'Payment',
                  'Confirm',
                ]
          }
          currentStep={2}
        />
      )}
      <Card
        cardTitle={verified ? 'Verified!' : 'Verify Email Address'}
        cardSubtitle={
          verified
            ? 'You have successfully verified your email. You are one step closer to connecting!'
            : "We've sent a 6 digit code to your email. Enter it below to confirm your email address."
        }
      >
        {verified ? (
          <FlexContainer>
            <Button type="link" to="/login">
              Log In
            </Button>
          </FlexContainer>
        ) : (
          <ClientOnly>
            <Alert
              type="info"
              message="
              Note: it can take up to 15 minutes for your code to arrive. Please check your spam folders."
            />
            <FlexContainer>
              <Formik
                validateOnMount
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  dispatch(
                    verifyEmail({
                      email: values.email,
                      confirmationCode: String(values.confirmationCode),
                    })
                  ).then((response: ActionResponseType) => {
                    setSubmitting(false);
                    if (response && !response.error) {
                      setVerified(true);
                    }
                  });
                }}
              >
                {({ isSubmitting, isValid, values }) => (
                  <Form style={{ width: '100%' }}>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      label="Email Address"
                      validate={requiredEmail}
                      required
                    />
                    <Field
                      as={Input}
                      type="number"
                      maxLength={6}
                      name="confirmationCode"
                      label="Verification Code"
                      validate={requiredField}
                      required
                    />
                    <FlexContainer>
                      <Button
                        block
                        type="submit"
                        disabled={isSubmitting || !isValid || values === initialValues}
                        isLoading={isSubmitting || auth.isLoading}
                      >
                        {auth.isLoading ? 'Confirming' : 'Confirm Email'}
                      </Button>
                      <Button type="link" to="/" color="text" block>
                        Cancel
                      </Button>
                    </FlexContainer>
                    <HorizontalRule />
                    <FlexContainer flexDirection="column">
                      <p style={{ textAlign: 'center' }}>
                        Didn&apos;t receive an email with a verification code? Enter your email
                        address and click the button below to receive a new verification code.
                      </p>
                      <Button
                        type="button"
                        disabled={!values.email}
                        onClick={() => resend(values.email)}
                        color="primaryOutline"
                        isLoading={auth.isLoading}
                      >
                        Send Another code
                      </Button>
                    </FlexContainer>
                  </Form>
                )}
              </Formik>
            </FlexContainer>
          </ClientOnly>
        )}
      </Card>
    </>
  );
};

export default VerifyEmail;
