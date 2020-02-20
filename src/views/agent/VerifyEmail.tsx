import React, { FunctionComponent, SyntheticEvent } from 'react';
import { Formik, Field, Form } from 'formik';
import queryString from 'query-string';

import {
  Box, Button, Input, FlexContainer, Header, Row, Column,
} from '../../components';


interface VerifyEmailFormValues {
  digit1?: string;
  digit2?: string;
  digit3?: string;
  digit4?: string;
  digit5?: string;
  digit6?: string;
}

type VerifyEmailType = {
  location: {
    search: string;
  };
}

const resend = (email?: string) => {
  console.log(email);
};

const focusChange = (e: SyntheticEvent) => {
  if (e.target.value.length >= 1) {
    const currentInputIndex = Number(e.target.name.charAt(5));
    document.getElementsByName(`digit${currentInputIndex + 1}`)[0].focus();
  }
};

const VerifyEmail: FunctionComponent<VerifyEmailType> = (props: VerifyEmailType) => {
  const initialValues: VerifyEmailFormValues = {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  };

  const emailAddress = queryString.parse(props.location.search).email;

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box textAlign="center">
            <FlexContainer flexDirection="column">
              <Header align="center">Verify Email Address</Header>
              <p>
                Please enter the 6 digit code sent to
                {' '}
                {emailAddress}
              </p>
            </FlexContainer>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                const { digit1, digit2, digit3, digit4, digit5, digit6 } = values;
                const combined = digit1+digit2+digit3+digit4+digit5+digit6;
                setTimeout(() => {
                  alert(combined);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <FlexContainer height={150}>
                    <Field
                      as={Input}
                      type="text"
                      name="digit1"
                      square
                      maxLength={1}
                      onInput={(e: SyntheticEvent) => focusChange(e)}
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="digit2"
                      square
                      maxLength={1}
                      onInput={(e: SyntheticEvent) => focusChange(e)}
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="digit3"
                      square
                      maxLength={1}
                      onInput={(e: SyntheticEvent) => focusChange(e)}
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="digit4"
                      square
                      maxLength={1}
                      onInput={(e: SyntheticEvent) => focusChange(e)}
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="digit5"
                      square
                      maxLength={1}
                      onInput={(e: SyntheticEvent) => focusChange(e)}
                    />
                    <Field
                      as={Input}
                      type="text"
                      name="digit6"
                      square
                      maxLength={1}
                    />
                  </FlexContainer>
                  <Button type="submit" disabled={isSubmitting || !isValid}>
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>
            <Button type="link" to="/" color="text" block>
              Cancel
            </Button>
            <FlexContainer height={150} flexDirection="column">
              <p>Didn&apos;t receive an email?</p>
              <Button type="button" onClick={() => resend(String(emailAddress))} color="primaryOutline">
                Send Another code
              </Button>
            </FlexContainer>
          </Box>
        </div>
      </Column>
    </Row>
  );
};

export default VerifyEmail;
