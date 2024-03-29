import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import { Card, Button, HorizontalRule, Input, Row, Column, PageContainer } from '../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import trackEvent from '../utils/analytics';

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
    subject: '',
  };

  return (
    <PageContainer>
      <Card
        cardTitle="Learn more more about becoming a RealtyOffer Agent"
        cardSubtitle="We will be launching soon, but leave us your information and we will be in touch"
      >
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => {
            const valuesWithSubject = {
              ...values,
              subject: `New Interested Agent: ${values.firstName} ${values.lastName}`,
            };
            addToMailchimp(values.email, {
              FNAME: values.firstName,
              LNAME: values.lastName,
              'group[78807][2]': '2',
            });
            postFormUrlEncoded('agent-landing', valuesWithSubject)
              .then(() => {
                navigate('/');
                dispatch(
                  addAlert({
                    message: 'Thanks for your interest! We will be reaching out shortly.',
                    type: 'success',
                  })
                );
                trackEvent('Agent Landing Form completed', {
                  ...valuesWithSubject,
                });
              })
              .catch(() => {
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again.',
                    type: 'danger',
                  })
                );

                trackEvent('Agent Landing Form failure', {
                  ...valuesWithSubject,
                });
              });
          }}
        >
          {({ values, isSubmitting, isValid, setFieldValue }) => (
            <Form
              name="agent-landing"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onBlur={() =>
                setFieldValue(
                  'subject',
                  `New Interested Agent: ${values.firstName} ${values.lastName}`
                )
              }
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
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    validate={requiredPhoneNumber}
                    required
                    placeholder="XXX-XXX-XXXX"
                  />
                </Column>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    label="Email"
                    validate={requiredEmail}
                    required
                  />
                </Column>
              </Row>

              <Field
                as={Input}
                type="text"
                name="agentId"
                label="Agent ID"
                validate={requiredField}
                required
              />
              <Field as={Input} type="text" name="brokerName" label="Broker" />

              <Field as={Input} type="textarea" name="message" label="Any questions or comments?" />
              <HorizontalRule />

              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
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
