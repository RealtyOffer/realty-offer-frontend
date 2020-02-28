/* eslint-disable import/no-cycle */
import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import { FaRegCheckCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Box, Button, Input, FlexContainer, Header, Row, Column,
} from '../../../components';
import { verifyEmail } from '../../../redux/ducks/auth';
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
  },
  auth: {},
}

const resend = () => {
  alert('TODO');
};

const focusChange = (e: SyntheticEvent) => { // SyntheticInputEvent not supported by TS yet
  if (e.target.value.length >= 1) {
    const currentInputIndex = Number(e.target.name.charAt(5));
    document.getElementsByName(`digit${currentInputIndex + 1}`)[0].focus();
  }
};

const VerifyEmail: FunctionComponent<VerifyEmailType> = (props: VerifyEmailType) => {
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

  const height = '150px';

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box largePadding>
            {
              !verified ? (
                <>
                  <FlexContainer flexDirection="column">
                    <Header align="center">Verify Email Address</Header>
                    <p style={{ textAlign: 'center' }}>
                      Please enter your email address and the 6 digit code sent to verify
                      your account.
                    </p>
                  </FlexContainer>
                  <FlexContainer height="400px">
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
                          if (!response.error) {
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
                          <FlexContainer>
                            <Button block type="submit" disabled={isSubmitting || !isValid || values === initialValues}>
                              Confirm Email
                            </Button>
                            <Button type="link" to="/" color="text" block>
                              Cancel
                            </Button>
                          </FlexContainer>
                        </Form>
                      )}
                    </Formik>
                  </FlexContainer>
                  <FlexContainer height={height} flexDirection="column">
                    <p>Didn&apos;t receive an email?</p>
                    <Button type="button" onClick={() => resend()} color="primaryOutline">
                      Send Another code
                    </Button>
                  </FlexContainer>
                </>
              ) : (
                <>
                  <FlexContainer flexDirection="column">
                    <FaRegCheckCircle color={brandSuccess} size={fontSizeH1} />
                    <Header>Verified!</Header>
                    <p>
                      You have successfully verified your email.
                      You are one step closer to connecting with new clients.
                    </p>
                  </FlexContainer>
                  <FlexContainer height={height}>
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
    actions: bindActionCreators({ verifyEmail }, dispatch),
  }),
)(VerifyEmail);
