import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';

import { Box, Button, Input, FlexContainer, Header, Row, Column } from '../../components';

interface CreateAgentFormValues {
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  password?: string;
};

const CreateAgent: FunctionComponent<{}> = () => {
  const initialValues: CreateAgentFormValues = {
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
  };

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box>
            <FlexContainer flexDirection="column">
              <Header>Sign Up!</Header>
              <p>Tell Us About Yourself</p>
            </FlexContainer>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors: CreateAgentFormValues = {};
                if (!values.fullName) {
                  errors.fullName = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)
                ) {
                  errors.emailAddress = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field as={Input} type="text" name="fullName" label="Full Name" />
                  <Field as={Input} type="text" name="phoneNumber" label="Phone Number" />
                  <Field as={Input} type="email" name="emailAddress" label="Email Address" />
                  <Field as={Input} type="password" name="password" label="Password" />
                  <Button type="submit" disabled={isSubmitting}>
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </div>
      </Column>
    </Row>
  )
};

export default CreateAgent;
