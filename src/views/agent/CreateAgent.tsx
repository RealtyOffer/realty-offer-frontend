import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';

import {
  Box, Button, Input, FlexContainer, Header, Row, Column,
} from '../../components';
import {
  requiredEmail, requiredField, requiredPhoneNumber, requiredPassword,
} from '../../utils/validations';

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
      <Column md={4} mdOffset={4}>
        <div>
          <Box>
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
                    type="text"
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
                    as={Input}
                    type="password"
                    name="password"
                    label="Password"
                    validate={requiredPassword}
                  />
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
