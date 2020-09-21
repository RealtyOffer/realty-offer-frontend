import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';

import {
  Row,
  Column,
  PageContainer,
  Button,
  Card,
  Input,
  HorizontalRule,
  Seo,
} from '../components';

import { requiredEmail, requiredField } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';

type LoginProps = {};

const Contact: FunctionComponent<LoginProps> = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
  };

  return (
    <PageContainer>
      <Seo title="Contact Us" />
      <Card cardTitle="Contact Us">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            postFormUrlEncoded('https://realtyoffer.com/', 'contact', values)
              .then(() => {
                setSubmitting(false);
                resetForm();
                dispatch(
                  addAlert({
                    message: 'Thanks for your message. We will be in touch shortly!',
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
            <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
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
                  <Field as={Input} type="tel" name="phone" label="Phone Number" />
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
                type="textarea"
                name="message"
                label="Message"
                validate={requiredField}
                required
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
      </Card>
    </PageContainer>
  );
};

export default Contact;
