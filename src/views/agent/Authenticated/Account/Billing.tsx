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
import { getFortispayAccountvaults, getFortispayRecurrings } from '../../../../redux/ducks/fortis';
import { reformattedPhone, formatPhoneNumberValue } from '../../../../utils/phoneNumber';
import { createOptionsFromManagedDropdownList } from '../../../../utils/createOptionsFromArray';

type AgentProfileProps = {} & RouteComponentProps;

const AgentProfile: FunctionComponent<AgentProfileProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (agent.fortispayContactId != null) {
      getFortispayAccountvaults({
        email: auth.email,
        // eslint-disable-next-line @typescript-eslint/camelcase
        contact_id: agent.fortispayContactId,
      });
      
      getFortispayRcurrings({
        email: auth.email,
        // eslint-disable-next-line @typescript-eslint/camelcase
        contact_id: agent.fortispayContactId,
      });
    }
  });
  const recurringInitialValues = {
    active: false,
  };
  const billingInitialValues = {
    lastFour: auth.firstName,
    lastName: auth.lastName,
  };

  return (
    <>
      <Seo title="Billing" />
      <Heading>Billing</Heading>
      <Formik
        validateOnMount
        initialValues={recurringInitialValues}
        onSubmit={(values, { setSubmitting }) => {
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
              phoneNumber: reformattedPhone(values.phoneNumber),
            })
          ).then(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ ...rest }) => (
          <Form>
            <Box>
              <Heading as="h2">Current Plan</Heading>
            </Box>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={billingInitialValues}
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
