import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'gatsby';

import {
  FlexContainer,
  Box,
  Input,
  Heading,
  Row,
  Column,
  Seo,
  FileUpload,
} from '../../../../components';
import {
  requiredField,
  requiredEmail,
  requiredPhoneNumber,
  requiredSelect,
} from '../../../../utils/validations';
import AutoSave from '../../../../utils/autoSave';
import Security from './Security';
import { RootState } from '../../../../redux/ducks';
import { updateUser } from '../../../../redux/ducks/auth';
import { updateAgentProfile } from '../../../../redux/ducks/agent';
import { getLanguagesList, getGendersList, getStatesList } from '../../../../redux/ducks/dropdowns';
import { reformattedPhoneForCognito, formatPhoneNumberValue } from '../../../../utils/phoneNumber';
import { createOptionsFromManagedDropdownList } from '../../../../utils/createOptionsFromArray';

type AgentProfileProps = {} & RouteComponentProps;

const AgentProfile: FunctionComponent<AgentProfileProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const auth = useSelector((state: RootState) => state.auth);
  const languagesList = useSelector((state: RootState) => state.dropdowns.languages.list);
  const gendersList = useSelector((state: RootState) => state.dropdowns.genders.list);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (languagesList.length === 0) {
      dispatch(getLanguagesList());
    }
  }, []);

  useEffect(() => {
    if (gendersList.length === 0) {
      dispatch(getGendersList());
    }
  }, []);

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);

  const personalInfoInitialValues = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    phoneNumber: formatPhoneNumberValue(auth.phoneNumber.replace('+', '')),
    email: auth.email,
    // we want to visually have gender dropdown in this section, so initialize it here
    genderId: String(agent.genderId),
  };
  const agentInfoInitialValues = {
    id: agent.id,
    agentId: agent.agentId,
    brokerName: agent.brokerName,
    brokerPhoneNumber: agent.brokerPhoneNumber,
    brokerAddressLine1: agent.brokerAddressLine1,
    brokerAddressLine2: agent.brokerAddressLine2,
    brokerCity: agent.brokerCity,
    brokerState: agent.brokerState,
    brokerZip: agent.brokerZip,
    state: 'MI', // TODO
    // initialize gender so our PUT still works
    genderId: String(agent.genderId),
  };
  const aboutMeInitialValues = {
    certificates: agent.certificates || '',
    agentLanguages: agent.agentLanguages?.map((val) => String(val)) || '',
    aboutMe: agent.aboutMe || '',
  };

  return (
    <>
      <Seo title="My Profile" />
      <Heading>My Profile</Heading>
      <Formik
        validateOnMount
        initialValues={personalInfoInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (values.genderId) {
            dispatch(
              updateAgentProfile({
                ...agent,
                genderId: Number(values.genderId),
              })
            );
          }
          dispatch(
            updateUser({
              ...values,
              phoneNumber: reformattedPhoneForCognito(values.phoneNumber),
            })
          ).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ ...rest }) => (
          <Form>
            <Box>
              <Heading as="h2">Personal Information</Heading>
              <Row>
                <Column md={3}>
                  <FlexContainer flexDirection="column" height="100%">
                    <FileUpload />
                  </FlexContainer>
                </Column>
                <Column md={9}>
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
                        type="select"
                        name="genderId"
                        label="Gender"
                        options={createOptionsFromManagedDropdownList(gendersList)}
                        validate={requiredSelect}
                        required
                        {...rest}
                      />
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Field
                as={Input}
                type="email"
                name="email"
                label="Email Address"
                validate={requiredEmail}
                required
                disabled
                readOnly
                helpText={
                  <span>
                    <Link to="/contact">Contact us</Link> to update your account&apos;s email
                    address
                  </span>
                }
              />
              <AutoSave />
            </Box>
          </Form>
        )}
      </Formik>
      {agent && agent.agentId && (
        <Formik
          initialValues={agentInfoInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              updateAgentProfile({
                ...values,
                genderId: Number(values.genderId),
                brokerZip: String(values.brokerZip),
              })
            ).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ ...rest }) => (
            <Form>
              <Box>
                <Heading as="h2">Agent Information</Heading>
                <Row>
                  <Column sm={4}>
                    <Field
                      as={Input}
                      type="text"
                      name="agentId"
                      label="Agent ID"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column sm={4}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerName"
                      label="Broker Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column sm={4}>
                    <Field
                      as={Input}
                      type="tel"
                      name="brokerPhoneNumber"
                      label="Broker Phone Number"
                      validate={requiredPhoneNumber}
                      required
                    />
                  </Column>
                  <Column sm={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerAddressLine1"
                      label="Broker Address Line 1"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column sm={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerAddressLine2"
                      label="Broker Address Line 2"
                    />
                  </Column>
                  <Column sm={5}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerCity"
                      label="Broker City"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column sm={3}>
                    <Field
                      as={Input}
                      type="select"
                      name="brokerState"
                      label="Broker State"
                      options={createOptionsFromManagedDropdownList(statesList)}
                      {...rest}
                      validate={requiredSelect}
                      required
                    />
                  </Column>
                  <Column sm={4}>
                    <Field as={Input} type="number" name="brokerZip" label="Broker Zip" />
                  </Column>
                </Row>
                <AutoSave />
              </Box>
            </Form>
          )}
        </Formik>
      )}
      {agent && agent.agentId && (
        <Formik
          validateOnMount
          initialValues={aboutMeInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              updateAgentProfile({
                ...agent,
                certificates: values.certificates,
                aboutMe: values.aboutMe,
                agentLanguages: values.agentLanguages?.map((val) => Number(val)),
              })
            ).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ ...rest }) => (
            <Form>
              <Box>
                <Heading as="h2">About You</Heading>
                <Field
                  as={Input}
                  type="select"
                  isMulti
                  name="agentLanguages"
                  label="Languages Spoken (other than English)"
                  options={createOptionsFromManagedDropdownList(languagesList)}
                  {...rest}
                />
                <Field as={Input} type="text" name="certificates" label="Certificates" />
                <Field as={Input} type="textarea" name="aboutMe" label="Bio" />
                <AutoSave />
              </Box>
            </Form>
          )}
        </Formik>
      )}

      <Security />
    </>
  );
};

export default AgentProfile;
