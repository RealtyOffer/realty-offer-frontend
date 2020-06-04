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

type ConsumerLandingFormProps = {};

const ConsumerLandingForm: FunctionComponent<ConsumerLandingFormProps> = () => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    freeMortgageConsult: false,
    type: '',
    where: '',
    message: '',
  };

  const encode = (data: { [key: string]: string | boolean }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <PageContainer>
      <Card cardTitle="Connect with a RealtyOffer Specialist">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => {
            fetch('https://realtyoffer.com/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encode({
                'form-name': 'consumer-landing',
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
          {({ values, isSubmitting, isValid, ...rest }) => (
            <Form
              name="consumer-landing"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="consumer-landing" />
              <Row>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="firstName"
                    label="First Name"
                    validate={requiredField}
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    validate={requiredField}
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    validate={requiredPhoneNumber}
                  />
                </Column>
                <Column sm={6}>
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
                type="select"
                name="type"
                options={[
                  { value: 'Sell My Home', label: 'Sell My Home' },
                  { value: 'Buy', label: 'Buy' },
                  { value: 'Both Buy & Sell', label: 'Both Buy & Sell' },
                ]}
                label="What are you looking to do?"
                validate={requiredSelect}
                {...rest}
              />
              <Field as={Input} type="text" name="where" label="Where?" validate={requiredField} />
              <Field
                as={Input}
                type="checkbox"
                checked={values.freeMortgageConsult}
                name="freeMortgageConsult"
                label="Would you like a free mortgage consultation?"
              />
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

export default ConsumerLandingForm;
