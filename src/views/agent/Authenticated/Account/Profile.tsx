import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Box, Input, Heading, Row, Column } from '../../../../components';
import {
  requiredField,
  requiredEmail,
  requiredPhoneNumber,
} from '../../../../utils/validations';
import languagesList from '../../../../utils/languagesList';

type AgentProfileProps = {} & RouteComponentProps;

const AgentProfile: FunctionComponent<AgentProfileProps> = props => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    agentId: '',
    brokerName: '',
    brokerPhoneNumber: '',
    brokerAddress: '',
    languagesSpoken: '',
    certificates: '',
    aboutMe: '',
  };

  return (
    <>
      <Heading>My Profile</Heading>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, isValid, ...rest }) => (
          <Form>
            <Box>
              <Heading as="h2">Personal Information</Heading>
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
            </Box>
            <Box>
              <Heading as="h2">Agent Information</Heading>
              <Field
                as={Input}
                type="text"
                name="agentId"
                label="Agent ID"
                validate={requiredField}
              />
              <Field
                as={Input}
                type="text"
                name="brokerName"
                label="Broker Name"
                validate={requiredField}
              />
              <Field
                as={Input}
                type="tel"
                name="brokerPhoneNumber"
                label="Broker Phone Number"
                validate={requiredPhoneNumber}
              />
              <Field
                as={Input}
                type="text"
                name="brokerAddress"
                label="Broker Address"
                validate={requiredField}
              />
            </Box>
            <Box>
              <Heading as="h2">Languages Spoken</Heading>
              <Field
                as={Input}
                type="select"
                isMulti
                name="languagesSpoken"
                label="Languages Spoken"
                options={languagesList}
                {...rest}
              />
            </Box>
            <Box>
              <Heading as="h2">Certificates</Heading>
              <Field
                as={Input}
                type="text"
                name="certificates"
                label="Certificates"
              />
            </Box>
            <Box>
              <Heading as="h2">About Me</Heading>
              <Field
                as={Input}
                type="text"
                name="aboutMe"
                label="About Me"
                validate={requiredField}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(
  state => ({
    // user: state.user,
  }),
  dispatch => ({
    actions: bindActionCreators({}, dispatch),
  }),
)(AgentProfile);
