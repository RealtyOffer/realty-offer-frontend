/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import {
  Row,
  Column,
  Button,
  Input,
  Heading,
  ProgressBar,
  HorizontalRule,
  Card,
  Seo,
  LoadingPage,
  ClientOnly,
} from '../../../components';
import { requiredEmail, requiredField, requiredPhoneNumber } from '../../../utils/validations';
import { createAgentProfile, captureAgentSignupData } from '../../../redux/ducks/agent';
import { ActionResponseType } from '../../../redux/constants';
import { RootState } from '../../../redux/ducks';
import { logout } from '../../../redux/ducks/auth';
import { createFortispayContact } from '../../../redux/ducks/fortis';
import { CreateContactSuccessAction } from '../../../redux/ducks/fortis.d';
import { getStatesList } from '../../../redux/ducks/dropdowns';
import { createOptionsFromManagedDropdownList } from '../../../utils/createOptionsFromArray';

type AgentInformationProps = {};

const AgentInformation: FunctionComponent<AgentInformationProps & RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const initialValues = {
    state: 'MI',
    agentId: '',
    brokerName: '',
    brokerAddressLine1: '',
    brokerAddressLine2: '',
    brokerCity: '',
    brokerZip: '',
    brokerState: '',
    brokerPhoneNumber: '',
    brokerEmail: '',
    cities: [],
    emailAddress: auth.email,
    id: 0,
  };

  useEffect(() => {
    dispatch(getStatesList());
  }, []);

  const save = () => {
    dispatch(
      captureAgentSignupData({
        agentProfileComplete: false,
      })
    );
    dispatch(logout());
    navigate('/');
  };

  return (
    <ClientOnly>
      <Card
        cardTitle="Agent Information"
        cardSubtitle="Get started by simply providing your Agent Information"
      >
        <Seo title="Agent Information" />
        <ProgressBar value={33} label="Step 1/3" name="progress" />
        {statesList.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                createFortispayContact({
                  email: auth.email,
                  first_name: auth.firstName,
                  last_name: auth.lastName,
                  home_phone: auth.phoneNumber.replace('+', ''),
                  office_phone: values.brokerPhoneNumber.replace('+', ''),
                  address: `${values.brokerAddressLine1} ${values.brokerAddressLine2}`,
                  city: values.brokerCity,
                  state: values.brokerState,
                  zip: String(values.brokerZip),
                  company_name: values.brokerName,
                })
              ).then((fortispayResponse: CreateContactSuccessAction) => {
                if (fortispayResponse.error) {
                  const fortispayError = Object.values(fortispayResponse.payload)[0];
                  console.log(fortispayError);
                  // TODO add alerts for fortis pay error
                  setSubmitting(false);
                } else {
                  dispatch(
                    createAgentProfile({
                      ...values,
                      fortispayContactId: fortispayResponse.payload.id,
                      genderId: 0,
                      aboutMe: '',
                      certificates: '',
                      agentLanguages: [],
                      brokerZip: String(values.brokerZip),
                      brokerPhoneNumber: values.brokerPhoneNumber,
                    })
                  ).then((response: ActionResponseType) => {
                    setSubmitting(false);
                    dispatch(
                      captureAgentSignupData({
                        agentProfileComplete: true,
                      })
                    );
                    if (response && !response.error) {
                      navigate('/agent/business-information');
                    }
                  });
                }
              });
            }}
          >
            {({ isSubmitting, isValid, ...rest }) => (
              <Form>
                <Heading as="h5">Agent Information</Heading>
                <Row>
                  <Column md={8}>
                    <Field
                      as={Input}
                      type="text"
                      name="agentId"
                      label="Agent ID"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="select"
                      name="state"
                      label="State"
                      validate={requiredField}
                      required
                      disabled
                      options={createOptionsFromManagedDropdownList(statesList)}
                      {...rest}
                    />
                  </Column>
                </Row>

                <Heading as="h5">Broker Information</Heading>
                <Row>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerName"
                      label="Broker Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="tel"
                      name="brokerPhoneNumber"
                      label="Broker Phone Number"
                      validate={requiredPhoneNumber}
                      required
                    />
                  </Column>
                  <Column>
                    <Field
                      as={Input}
                      type="email"
                      name="brokerEmail"
                      label="Broker Email"
                      validate={requiredEmail}
                      required
                    />
                  </Column>
                  <Column>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerAddressLine1"
                      label="Address"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column>
                    <Field as={Input} type="text" name="brokerAddressLine2" label="Address Cont." />
                  </Column>
                  <Column md={5}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerCity"
                      label="City"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={3}>
                    <Field
                      as={Input}
                      type="select"
                      name="brokerState"
                      label="State"
                      validate={requiredField}
                      required
                      options={createOptionsFromManagedDropdownList(statesList)}
                      {...rest}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="brokerZip"
                      label="Zip"
                      validate={requiredField}
                      required
                    />
                  </Column>
                </Row>

                <HorizontalRule />
                <Button type="submit" disabled={isSubmitting || !isValid} block>
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <LoadingPage />
        )}
        <Button type="button" onClick={() => save()} color="text" block>
          Save &amp; Complete Later
        </Button>
      </Card>
    </ClientOnly>
  );
};

export default AgentInformation;
