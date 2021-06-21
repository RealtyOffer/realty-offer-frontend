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

type ContactProps = {};

const Contact: FunctionComponent<ContactProps> = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
    subject: '',
  };

  return (
    <PageContainer>
      <Seo
        title="Contact Us"
        description="Do you have questions about buying a house or selling your home to a Realty Offer? Feel free to contact us via phone, email or fill out our contact us form. Contact us today."
      />
      <Card cardTitle="Contact Us">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const valuesWithSubject = {
              ...values,
              subject: `New contact form submission from ${values.firstName} ${values.lastName}`,
            };
            postFormUrlEncoded('contact', valuesWithSubject)
              .then(() => {
                resetForm();
                dispatch(
                  addAlert({
                    message: 'Thanks for your message. We will be in touch shortly!',
                    type: 'success',
                  })
                );
                if (window && window.analytics) {
                  window.analytics.track('Contact Form completed', {
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
                  window.analytics.track('Contact Form failure', {
                    ...valuesWithSubject,
                  });
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting, isValid, setFieldValue }) => (
            <Form
              name="contact"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onBlur={() =>
                setFieldValue(
                  'subject',
                  `New contact form submission from ${values.firstName} ${values.lastName}`
                )
              }
            >
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

export default Contact;
