import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';

import {
  Box, Button, Input, FlexContainer, Header, Row, Column, HorizontalRule,
} from '../../../components';
import {
  requiredEmail, requiredField, requiredPhoneNumber, requiredPassword,
} from '../../../utils/validations';

interface CreateAgentFormValues {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  password?: string;
}

const CreateAgent: FunctionComponent<{}> = () => {
  const initialValues: CreateAgentFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  };

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box largePadding>
            <FlexContainer flexDirection="column">
              <Header>Sign Up!</Header>
              <p>Tell Us About Yourself</p>
            </FlexContainer>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                  navigate('/agent/verify-email');
                }, 400);
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <Row>
                    <Column xs={6}>
                      <Field
                        as={Input}
                        type="text"
                        name="firstName"
                        label="First Name"
                        validate={requiredField}
                      />
                    </Column>
                    <Column xs={6}>
                      <Field
                        as={Input}
                        type="text"
                        name="lastName"
                        label="Last Name"
                        validate={requiredField}
                      />
                    </Column>
                  </Row>
                  <Field
                    as={Input}
                    type="tel"
                    name="phoneNumber"
                    label="Phone Number"
                    validate={requiredPhoneNumber}
                  />
                  <Field
                    as={Input}
                    type="email"
                    name="emailAddress"
                    label="Email Address"
                    validate={requiredEmail}
                  />
                  <Field
                    name="password"
                    validate={requiredPassword}
                  >
                    {({ field, form, meta }) => (
                      <Input
                        type="password"
                        label="Password"
                        {...field}
                        {...form}
                        {...meta}
                      />
                    )}
                  </Field>
                  <HorizontalRule />
                  <Button type="submit" disabled={isSubmitting || !isValid} block>
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>
            <Button type="link" to="/" color="text" block>
              Cancel
            </Button>
          </Box>
        </div>
      </Column>
    </Row>
  );
};

export default CreateAgent;
