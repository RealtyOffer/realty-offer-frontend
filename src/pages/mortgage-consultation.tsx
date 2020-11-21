import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';

import { Button, Card, HorizontalRule, Input, Row, Column, PageContainer } from '../components';
import {
  requiredField,
  requiredEmail,
  requiredSelect,
  requiredPhoneNumber,
} from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';

const MortgageConsultation: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    type: '',
    message: '',
    subject: '',
  };
  return (
    <PageContainer>
      <Card
        cardTitle="Connect with a RealtyOffer Specialist"
        cardSubtitle="Interested in learning more about mortgages with one of our qualified specialists?"
      >
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const valuesWithSubject = {
              ...values,
              subject: `New Interested Mortgage Consultation: ${values.firstName} ${values.lastName} - ${values.type}`,
            };
            postFormUrlEncoded('mortgage-consultation', valuesWithSubject)
              .then(() => {
                resetForm();
                navigate('/');
                dispatch(
                  addAlert({
                    message: 'Thanks for your interest! We will be reaching out shortly.',
                    type: 'success',
                  })
                );
                if (window && window.analytics) {
                  window.analytics.track('Mortgage Consultation Form completed', {
                    ...valuesWithSubject,
                  });
                }
              })
              .catch(() => {
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again.',
                    type: 'danger',
                  })
                );
                if (window && window.analytics) {
                  window.analytics.track('Mortgage Consultation Form failure', {
                    ...valuesWithSubject,
                  });
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting, isValid, setFieldValue, ...rest }) => (
            <Form
              name="mortgage-consultation"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onBlur={() =>
                setFieldValue(
                  'subject',
                  `New Interested Mortgage Consultation: ${values.firstName} ${values.lastName} - ${values.type}`
                )
              }
            >
              <input type="hidden" name="form-name" value="mortgage-consultation" />
              <Row>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="firstName"
                    label="First Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    validate={requiredPhoneNumber}
                    required
                  />
                </Column>
                <Column sm={6}>
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
                type="select"
                name="type"
                options={[
                  { value: 'Sell My Home', label: 'Sell My Home' },
                  { value: 'Buy', label: 'Buy' },
                  { value: 'Both Buy & Sell', label: 'Both Buy & Sell' },
                ]}
                label="What are you looking to do?"
                validate={requiredSelect}
                required
                setFieldValue={setFieldValue}
                {...rest}
              />
              <Field as={Input} type="textarea" name="message" label="Any questions or comments?" />
              <HorizontalRule />

              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </PageContainer>
  );
};

export default MortgageConsultation;
