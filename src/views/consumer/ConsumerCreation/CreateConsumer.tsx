import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from '@reach/router';

import { Button, Seo, Input, Row, Card, Column, HorizontalRule } from '../../../components';

import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createUser, CreateUserFormValues } from '../../../redux/ducks/auth';
import { ActionResponseType } from '../../../redux/constants';
import { captureConsumerData } from '../../../redux/ducks/consumer';
import UnsavedChangesModal from './UnsavedChangesModal';

type CreateConsumerProps = {
  actions: {
    createUser: Function;
    captureConsumerData: Function;
  };
} & RouteComponentProps;

const CreateConsumer: FunctionComponent<CreateConsumerProps> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const initialValues: CreateUserFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'Consumer',
  };

  const reformattedPhone = (num: string) => `+${num.replace(/-/g, '')}`;

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Seo title="Ready to buy or sell a home?" />
      <Card cardTitle="Create Account" cardSubtitle="Tell Us About Yourself">
        <>
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              props.actions.captureConsumerData({ email: values.email });
              props.actions
                .createUser({
                  ...values,
                  phoneNumber: reformattedPhone(values.phoneNumber),
                })
                .then((response: ActionResponseType) => {
                  setSubmitting(false);
                  // TODO: post the captured consumer data object from the consumer reducer state
                  if (response && !response.error) {
                    navigate('/consumer/verify-email');
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
          <Button type="button" onClick={() => toggleUnsavedChangesModal()} color="text" block>
            Cancel
          </Button>
        </>
      </Card>
      <UnsavedChangesModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleUnsavedChangesModal}
        captureConsumerData={props.actions.captureConsumerData}
      />
    </>
  );
};

export default connect(null, (dispatch) => ({
  actions: bindActionCreators({ createUser, captureConsumerData }, dispatch),
}))(CreateConsumer);
