/* eslint-disable import/no-cycle, jsx-a11y/label-has-associated-control */
import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import { FaRegCheckCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RouteComponentProps } from '@reach/router';
import {
  Box, Button, Input, FlexContainer, Heading, Row, Column,
} from '../../../components';
import { verifyEmail, resendSignupEmail } from '../../../redux/ducks/auth';
import { requiredField, requiredEmail } from '../../../utils/validations';
import { brandSuccess } from '../../../styles/color';
import { fontSizeH1 } from '../../../styles/typography';
import { ActionResponseType } from '../../../redux/constants';

export interface VerifyEmailFormValues {
  email: string;
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
}

declare const document: Document;

type VerifyEmailType = {
  actions: {
    verifyEmail: Function;
    resendSignupEmail: Function;
  },
  auth: {};
}

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

const VerifyEmail: FunctionComponent<VerifyEmailType
  & RouteComponentProps> = (props: VerifyEmailType) => {
    const [verified, setVerified] = useState(false);

    const initialValues: VerifyEmailFormValues = {
      email: '',
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
      digit5: '',
      digit6: '',
    };

    const resend = (email: string) => {
      props.actions.resendSignupEmail(email);
    };

    return (
      <Row>
        <Column md={6} mdOffset={3}>
          <div>
            <Box backgroundAccent>
              {
              !verified ? (
                <>
                  <FlexContainer flexDirection="column">
                    <Heading align="center">Verify Email Address</Heading>
                    <p style={{ textAlign: 'center' }}>
                      Please enter your email address and the 6 digit code sent to verify
                      your account.
                    </p>
                  </FlexContainer>
                  <FlexContainer>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={(values, { setSubmitting }) => {
                        const {
                          digit1, digit2, digit3, digit4, digit5, digit6,
                        } = values;
                        const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
                        props.actions.verifyEmail({
                          email: values.email,
                          confirmationCode: combined,
                        }).then((response: ActionResponseType) => {
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
                          />
                          <label>Verification Code</label>
                          <FlexContainer justifyContent="space-between" flexWrap="nowrap">
                            {
                              ['digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6'].map((digit) => (
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
                              ))
                            }
                          </FlexContainer>
                          <FlexContainer>
                            <Button block type="submit" disabled={isSubmitting || !isValid || values === initialValues}>
                              Confirm Email
                            </Button>
                            <Button type="link" to="/" color="text" block>
                              Cancel
                            </Button>
                          </FlexContainer>
                          <FlexContainer flexDirection="column">
                            <p style={{ textAlign: 'center' }}>
                              Didn&apos;t receive an email? Enter your email address and click the
                              button below to receive a new verification code.
                            </p>
                            <Button type="button" disabled={!values.email} onClick={() => resend(values.email)} color="primaryOutline">
                              Send Another code
                            </Button>
                          </FlexContainer>
                        </Form>
                      )}
                    </Formik>
                  </FlexContainer>
                </>
              ) : (
                <>
                  <FlexContainer flexDirection="column">
                    <FaRegCheckCircle color={brandSuccess} size={fontSizeH1} />
                    <Heading>Verified!</Heading>
                    <p>
                      You have successfully verified your email.
                      You are one step closer to connecting with new clients.
                    </p>
                  </FlexContainer>
                  <FlexContainer>
                    <Button type="link" to="/agent/agent-information">Set Up My Profile</Button>
                  </FlexContainer>
                </>
              )
            }
            </Box>
          </div>
        </Column>
      </Row>
    );
  };

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({
    actions: bindActionCreators({ verifyEmail, resendSignupEmail }, dispatch),
  }),
)(VerifyEmail);
