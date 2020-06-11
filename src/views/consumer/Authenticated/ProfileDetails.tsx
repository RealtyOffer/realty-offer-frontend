import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Input, Row, Column, ProgressBar } from '../../../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../../../utils/validations';
import AutoSave from '../../../utils/autoSave';
import { RootState } from '../../../redux/ducks';
// import { updateConsumerProfile } from '../../../redux/ducks/agent';

type ConsumerProfileDetailsProps = {} & RouteComponentProps;

const ConsumerProfileDetails: FunctionComponent<ConsumerProfileDetailsProps> = () => {
  // const consumer = useSelector((state: RootState) => state.consumer);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const personalInfoInitialValues = {
    // TODO: use values from consumer profile, not auth
    firstName: auth.firstName,
    lastName: auth.lastName,
    phoneNumber: auth.phoneNumber,
    email: auth.email,
  };

  return (
    <Formik
      validateOnMount
      initialValues={personalInfoInitialValues}
      onSubmit={(values, { setSubmitting }) => {
        // dispatch()
        // TODO: need auth update profile service
      }}
    >
      {() => (
        <Form>
          <Box>
            {true && ( // TODO: wrap logic around this
              <Row>
                <Column sm={6}>
                  <strong>Profile</strong> <span>50%</span>
                  <ProgressBar
                    value={50}
                    name="profile"
                    label="Next: Take personal information survey"
                  />
                </Column>
              </Row>
            )}
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
                  name="phoneNumber"
                  label="Phone Number"
                  validate={requiredPhoneNumber}
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
                />
              </Column>
            </Row>
            <AutoSave />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ConsumerProfileDetails;
