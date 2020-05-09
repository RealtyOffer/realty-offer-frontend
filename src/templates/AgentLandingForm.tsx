import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Button, HorizontalRule, Input, Modal, Heading, Row, Column } from '../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';

type AgentLandingFormProps = {
  toggleModal: () => void;
  modalIsOpen: boolean;
};

const AgentLandingForm: FunctionComponent<AgentLandingFormProps> = (props) => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    agentId: '',
    brokerName: '',
  };

  const encode = (data: { [key: string]: string }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <Modal isOpen={props.modalIsOpen} toggleModal={props.toggleModal}>
      <Heading styledAs="title">Become a RealtyOffer Agent</Heading>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) => {
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': 'agent-landing',
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
            .catch(() =>
              dispatch(
                addAlert({
                  message: 'Something went wrong, please try again.',
                  type: 'danger',
                })
              )
            );
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form name="agent-landing" method="post" netlify-honeypot="bot-field" data-netlify="true">
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="agent-landing" value="contact" />
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

export default AgentLandingForm;
