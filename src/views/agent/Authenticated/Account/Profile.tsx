import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Box, Input, Heading, Row, Column, Seo } from '../../../../components';
import { requiredField, requiredEmail, requiredPhoneNumber } from '../../../../utils/validations';
import languagesList from '../../../../utils/languagesList';
import AutoSave from '../../../../utils/autoSave';
import { RootState } from '../../../../redux/ducks';
import { updateAgentProfile } from '../../../../redux/ducks/agent';

type AgentProfileProps = {} & RouteComponentProps;

const AgentProfile: FunctionComponent<AgentProfileProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  const personalInfoInitialValues = {
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '123-456-7890',
    email: 'testuser@realtyoffer.com',
  };
  const agentInfoInitialValues = {
    agentId: agent.agentId,
    brokerName: agent.brokerName,
    brokerPhoneNumber: agent.brokerPhoneNumber,
    brokerAddress: '',
    state: 'MI', // TODO
  };
  const aboutMeInitialValues = {
    languagesSpoken: '',
    certificates: '',
    aboutMe: '',
  };

  return (
    <>
      <Seo title="My Profile" />
      <Heading>My Profile</Heading>
      <Formik
        validateOnMount
        initialValues={personalInfoInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {() => (
          <Form>
            <Box>
              <Heading as="h2">Personal Information</Heading>
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
                    validate={requiredEmail}
                  />
                </Column>
              </Row>
              <AutoSave />
            </Box>
          </Form>
        )}
      </Formik>
      {agent && agent.agentId && (
        <Formik
          initialValues={agentInfoInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(updateAgentProfile(values)).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {() => (
            <Form>
              <Box>
                <Heading as="h2">Agent Information</Heading>
                <Row>
                  <Column sm={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="agentId"
                      label="Agent ID"
                      validate={requiredField}
                    />
                  </Column>
                  <Column sm={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerName"
                      label="Broker Name"
                      validate={requiredField}
                    />
                  </Column>
                  <Column sm={6}>
                    <Field
                      as={Input}
                      type="tel"
                      name="brokerPhoneNumber"
                      label="Broker Phone Number"
                      validate={requiredPhoneNumber}
                    />
                  </Column>
                  <Column sm={6}>
                    <Field as={Input} type="text" name="brokerAddress" label="Broker Address" />
                  </Column>
                </Row>
                <AutoSave />
              </Box>
            </Form>
          )}
        </Formik>
      )}

      <Formik
        validateOnMount
        initialValues={aboutMeInitialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                name="languagesSpoken"
                label="Languages Spoken"
                options={languagesList}
                {...rest}
              />
              <Field as={Input} type="text" name="certificates" label="Certificates" />
              <Field as={Input} type="textarea" name="aboutMe" label="Bio" />
              <AutoSave />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
}))(AgentProfile);
