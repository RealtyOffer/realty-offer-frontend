import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
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
import { createConsumerProfile } from '../../../redux/ducks/consumer';
import UnsavedChangesModal from './UnsavedChangesModal';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { RootState } from '../../../redux/ducks';

type CreateConsumerProps = {} & RouteComponentProps;

const CreateConsumer: FunctionComponent<CreateConsumerProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const consumer = useSelector((state: RootState) => state.consumer);
  const dispatch = useDispatch();

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

  const isBuyerAndSeller = consumer.listing.type === 'buyerSeller';

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
              dispatch(
                createUser({
                  ...values,
                  phoneNumber: reformattedPhone(values.phoneNumber),
                })
              ).then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  dispatch(
                    createConsumerProfile({
                      email: values.email,
                      listing: {
                        ...consumer.listing,
                        sellersZip: String(consumer.listing.sellersZip),
                      },
                      profile: {
                        id: 0,
                        otherLanguage: '',
                        genderPreference: '',
                      },
                    })
                  ).then((secondRes: ActionResponseType) => {
                    if (secondRes && !secondRes.error) {
                      dispatch(
                        addAlert({
                          message: 'Successfully created your profile!',
                          type: 'success',
                        })
                      );
                    }
                  });
                  navigate('/consumer/verify-email');
                }
              });
            }}
          >
            {({ isSubmitting, isValid }) => (
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
                <Button type="submit" disabled={isSubmitting || !isValid} block>
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
      <UnsavedChangesModal modalIsOpen={modalIsOpen} toggleModal={toggleUnsavedChangesModal} />
    </>
  );
};

export default CreateConsumer;
