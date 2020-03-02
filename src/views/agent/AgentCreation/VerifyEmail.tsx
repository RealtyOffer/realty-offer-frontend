import React, { useState, FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import queryString from 'query-string';
import { FaRegCheckCircle } from 'react-icons/fa';

import { RouteComponentProps } from '@reach/router';
import {
  Box, Button, Input, FlexContainer, Header, Row, Column,
} from '../../../components';
import { requiredField } from '../../../utils/validations';
import { brandSuccess } from '../../../styles/color';
import { fontSizeH1 } from '../../../styles/typography';

interface VerifyEmailFormValues {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
}

declare const document: Document;

type VerifyEmailType = {
  queryString: string;
}

const resend = (email?: string) => {
  // eslint-disable-next-line no-console
  console.log(email);
};

const focusChange = (e: SyntheticEvent) => { // SyntheticInputEvent not supported by TS yet
  const target = e.target as HTMLInputElement;
  if (target.value.length >= 1) {
    const currentInputIndex = Number(target.name.charAt(5));
    document.getElementsByName(`digit${currentInputIndex + 1}`)[0].focus();
  }
};

const VerifyEmail: FunctionComponent<VerifyEmailType
  & RouteComponentProps> = (props: VerifyEmailType) => {
    const [verified, setVerified] = useState(false);

    const initialValues: VerifyEmailFormValues = {
      digit1: '',
      digit2: '',
      digit3: '',
      digit4: '',
      digit5: '',
      digit6: '',
    };

    const emailAddress = queryString.parse(props.queryString).email;

    const height = '150px';

    return (
      <Row>
        <Column md={6} mdOffset={3}>
          <div>
            <Box largePadding textAlign="center">
              {
                !verified ? (
                  <>
                    <FlexContainer flexDirection="column">
                      <Header>Verify Email Address</Header>
                      <p>
                        Please enter the 6 digit code sent to
                        {' '}
                        {emailAddress}
                      </p>
                    </FlexContainer>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={(values, { setSubmitting }) => {
                        const {
                          digit1, digit2, digit3, digit4, digit5, digit6,
                        } = values;
                        const combined = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
                        setTimeout(() => {
                          // eslint-disable-next-line no-alert
                          alert(combined);
                          setSubmitting(false);
                          setVerified(true);
                        }, 400);
                      }}
                    >
                      {({ isSubmitting, isValid, values }) => (
                        <Form>
                          <FlexContainer height={height}>
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
                            <Button type="submit" disabled={isSubmitting || !isValid || values === initialValues}>
                              Confirm Email
                            </Button>
                            <Button type="link" to="/" color="text" block>
                              Cancel
                            </Button>
                          </FlexContainer>
                        </Form>
                      )}
                    </Formik>
                    <FlexContainer height={height} flexDirection="column">
                      <p>Didn&apos;t receive an email?</p>
                      <Button type="button" onClick={() => resend(String(emailAddress))} color="primaryOutline">
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

export default VerifyEmail;
