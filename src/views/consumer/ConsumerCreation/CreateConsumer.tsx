import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form, FormikProps } from 'formik';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  Seo,
  Input,
  Row,
  Card,
  Column,
  HorizontalRule,
  ProgressBar,
} from '../../../components';

import {
  requiredEmail,
  requiredSelect,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createUser } from '../../../redux/ducks/auth';
import { CreateUserFormValues } from '../../../redux/ducks/auth.d';
import { ActionResponseType } from '../../../redux/constants';
import { captureConsumerData, createConsumerProfile } from '../../../redux/ducks/consumer';
import { ConsumerStoreType } from '../../../redux/ducks/consumer.d';
import UnsavedChangesModal from './UnsavedChangesModal';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { RootState } from '../../../redux/ducks';

type CreateConsumerProps = {
  actions: {
    createUser: Function;
    captureConsumerData: Function;
    createConsumerProfile: Function;
    addAlert: Function;
  };
  consumer: ConsumerStoreType;
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

  const isBuyerAndSeller = props.consumer.signupData.consumerType === 'buyerSeller';

  return (
    <>
      <Seo title="Ready to buy or sell a home?" />
      <Card cardTitle="Create Account" cardSubtitle="Tell Us About Yourself">
        <>
          <ProgressBar
            value={100}
            label={`Step ${isBuyerAndSeller ? 4 : 3}/${isBuyerAndSeller ? 4 : 3}`}
            name="progress"
          />
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
                  if (response && !response.error) {
                    props.actions
                      .createConsumerProfile({
                        ...props.consumer.signupData,
                        sellersZip: String(props.consumer.signupData.sellersZip),
                      })
                      .then((secondRes: ActionResponseType) => {
                        if (secondRes && !secondRes.error) {
                          props.actions.addAlert({
                            message: 'Successfully created your profile!',
                            type: 'success',
                          });
                        }
                      });
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
                      validate={requiredSelect}
                    />
                  </Column>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="lastName"
                      label="Last Name"
                      validate={requiredSelect}
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

export default connect(
  (state: RootState) => ({
    consumer: state.consumer,
  }),
  (dispatch) => ({
    actions: bindActionCreators(
      { createUser, captureConsumerData, createConsumerProfile, addAlert },
      dispatch
    ),
  })
)(CreateConsumer);
