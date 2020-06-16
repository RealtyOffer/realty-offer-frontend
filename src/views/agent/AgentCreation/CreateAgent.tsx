import React, { FunctionComponent } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { Link, navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { Button, Input, Row, Card, Column, HorizontalRule, Seo } from '../../../components';

import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createUser } from '../../../redux/ducks/auth';
import { CreateUserFormValues } from '../../../redux/ducks/auth.d';
import { ActionResponseType } from '../../../redux/constants';

type CreateAgentProps = {} & RouteComponentProps;

const CreateAgent: FunctionComponent<CreateAgentProps> = () => {
  const dispatch = useDispatch();
  const initialValues: CreateUserFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'Agent',
  };

  const reformattedPhone = (num: string) => `+${num.replace(/-/g, '')}`;

  return (
    <Card cardTitle="Sign Up!" cardSubtitle="Tell Us About Yourself">
      <>
        <Seo title="Sign Up" />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              createUser({
                ...values,
                phoneNumber: reformattedPhone(values.phoneNumber),
              })
            ).then((response: ActionResponseType) => {
              setSubmitting(false);
              if (response && !response.error) {
                navigate('/agent/verify-email');
              }
            });
          }}
        >
          {(formikProps: FormikProps<any>) => (
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
                name="email"
                label="Email Address"
                validate={requiredEmail}
              />
              <Field
                as={Input}
                name="password"
                type="password"
                label="Password"
                helpText={passwordRulesString}
                validate={requiredPassword}
              />
              <HorizontalRule />
              <Button
                type="submit"
                disabled={formikProps.isSubmitting || !formikProps.isValid}
                block
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in now</Link>
        </p>
      </>
    </Card>
  );
};

export default CreateAgent;
