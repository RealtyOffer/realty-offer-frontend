import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Button, HorizontalRule, Input, Modal, Heading, Row, Column } from '../components';
import {
  requiredField,
  requiredEmail,
  requiredSelect,
  requiredPhoneNumber,
} from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';

type ConsumerLandingFormProps = {
  toggleModal: () => void;
  modalIsOpen: boolean;
};

const ConsumerLandingForm: FunctionComponent<ConsumerLandingFormProps> = (props) => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    freeMortgageConsult: false,
    type: '',
    where: '',
  };

  const encode = (data: { [key: string]: string | boolean }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <Modal isOpen={props.modalIsOpen} toggleModal={props.toggleModal}>
      <Heading styledAs="title">Connect with a RealtyOffer Specialist</Heading>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) => {
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': 'consumer-landing',
              ...values,
            }),
          })
            .then(() =>
              dispatch(
                addAlert({
                  message: 'Thanks for your interest! We will be reaching out shortly.',
                  type: 'success',
                })
              )
            )
            .catch((error) => {
              console.log(error);
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
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="consumer-landing" value="contact" />
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
            <Field as={Input} type="text" name="where" label="Where?" />
            <Field
              as={Input}
              type="checkbox"
              checked={values.freeMortgageConsult}
              name="freeMortgageConsult"
              label="Would you like a free mortgage consultation?"
            />
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
    </Modal>
  );
};

export default ConsumerLandingForm;
