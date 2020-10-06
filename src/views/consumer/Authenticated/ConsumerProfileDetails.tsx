import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, Link } from 'gatsby';

import { Box, Input, Row, Column, ProgressBar, Heading, Seo } from '../../../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../../../utils/validations';
import AutoSave from '../../../utils/autoSave';
import { RootState } from '../../../redux/ducks';
import { updateUser } from '../../../redux/ducks/auth';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { reformattedPhoneForCognito, formatPhoneNumberValue } from '../../../utils/phoneNumber';

type ConsumerProfileDetailsProps = {} & RouteComponentProps;

const ConsumerProfileDetails: FunctionComponent<ConsumerProfileDetailsProps> = () => {
  const consumer = useSelector((state: RootState) => state.consumer);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const personalInfoInitialValues = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    phoneNumber: formatPhoneNumberValue(auth.phoneNumber.replace('+', '')),
    email: auth.email,
  };

  const profileComplete = consumer.profile?.agePreferenceId && consumer.profile?.genderPreferenceId;

  return (
    <>
      <Seo title="My Profile" />
      <Heading as="h2">My Profile</Heading>
      <Formik
        validateOnMount
        initialValues={personalInfoInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            updateUser({
              ...values,
              phoneNumber: reformattedPhoneForCognito(values.phoneNumber),
            })
          ).then((response: ActionResponseType) => {
            if (response && !response.error) {
              dispatch(
                addAlert({
                  type: 'success',
                  message: 'Successfully saved your preferences!',
                })
              );
              navigate('/consumer/home');
            }
            setSubmitting(false);
          });
        }}
      >
        {() => (
          <Form>
            <Box>
              <Row>
                <Column sm={6}>
                  <strong>Profile</strong> <span>{!profileComplete ? '50%' : '100%'}</span>
                  <ProgressBar
                    value={!profileComplete ? 50 : 100}
                    name="profile"
                    label={
                      profileComplete
                        ? 'Your profile is complete!'
                        : 'Next: Take personal preferences questionnaire'
                    }
                  />
                </Column>
              </Row>

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
                    name="phoneNumber"
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
                    label="Email Address"
                    readOnly
                    disabled
                    validate={requiredEmail}
                    required
                    helpText={
                      <span>
                        <Link to="/contact">Contact us</Link> to update your account&apos;s email
                        address
                      </span>
                    }
                  />
                </Column>
              </Row>
              <AutoSave />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ConsumerProfileDetails;
