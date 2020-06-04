import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';

import { Card, Button, HorizontalRule, Input, Row, Column, PageContainer } from '../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';

type AgentLandingFormProps = {};

const AgentLandingForm: FunctionComponent<AgentLandingFormProps> = () => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agentId: '',
    brokerName: '',
    message: '',
  };

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <PageContainer>
      <Card cardTitle="Become a RealtyOffer Agent">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => {
            fetch('https://realtyoffer.com/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encode({
                'form-name': 'agent-landing',
                ...values,
              }),
            })
              .then(() => {
                navigate('/landing');
                dispatch(
                  addAlert({
                    message: 'Thanks for your interest! We will be reaching out shortly.',
                    type: 'success',
                  })
                );
              })
              .catch(() => {
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again.',
                    type: 'danger',
                  })
                );
              });
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form
              name="agent-landing"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="agent-landing" />
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
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    validate={requiredPhoneNumber}
                  />
                </Column>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    label="Email"
                    validate={requiredEmail}
                  />
                </Column>
              </Row>

              <Field
                as={Input}
                type="text"
                name="agentId"
                label="Agent ID"
                validate={requiredField}
              />
              <Field as={Input} type="text" name="brokerName" label="Broker" />

              <Field as={Input} type="textarea" name="message" label="Any questions or comments?" />
              <HorizontalRule />

              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </PageContainer>
  );
};

export default AgentLandingForm;
