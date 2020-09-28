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
import { reformattedPhoneForCognito } from '../../../utils/phoneNumber';
import { addAlert } from '../../../redux/ducks/globalAlerts';

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

  return (
    <Card cardTitle="Sign Up!" cardSubtitle="Tell Us About Yourself">
      <Seo title="Sign Up" />
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            createUser({
              ...values,
              phoneNumber: `${reformattedPhoneForCognito(values.phoneNumber)}`,
            })
          ).then((response: ActionResponseType) => {
            setSubmitting(false);
            if (response && !response.error) {
              dispatch(
                addAlert({
                  message: 'Successfully created account. Check your email for a verification code',
                  type: 'success',
                })
              );
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
                  required
                />
              </Column>
              <Column xs={6}>
                <Field
                  as={Input}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  validate={requiredField}
                  required
                />
              </Column>
            </Row>
            <Field
              as={Input}
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              validate={requiredPhoneNumber}
              required
            />
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
              name="password"
              type="password"
              label="Password"
              helpText={passwordRulesString}
              validate={requiredPassword}
              required
            />
            <HorizontalRule />
            <Button type="submit" disabled={formikProps.isSubmitting || !formikProps.isValid} block>
              Create Account
            </Button>
            <p style={{ textAlign: 'center' }}>
              <small>
                By clicking &quot;Create Account&quot;, I agree to the{' '}
                <a href="/terms" target="_blank">
                  Terms &amp; Conditions
                </a>
                .
              </small>
            </p>
          </Form>
        )}
      </Formik>
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log in now</Link>
      </p>
    </Card>
  );
};

export default CreateAgent;
