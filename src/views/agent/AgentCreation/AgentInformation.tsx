import React, { FunctionComponent } from 'react';
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
} from '../../../components';
import { requiredField, requiredPhoneNumber } from '../../../utils/validations';
import statesList from '../../../utils/statesList';
import { createAgentProfile, captureAgentSignupData } from '../../../redux/ducks/agent';
import { ActionResponseType } from '../../../redux/constants';
import { RootState } from '../../../redux/ducks';
import { logout } from '../../../redux/ducks/auth';
import { CityType } from '../../../redux/ducks/admin.d';

interface AgentInformationFormValues {
  state: string;
  agentId: string;
  brokerName: string;
  brokerAddressLine1: string;
  brokerAddressLine2: string;
  brokerCity: string;
  brokerState: string;
  brokerZip: string;
  brokerPhoneNumber: string;
  emailAddress: string;
  cities: Array<CityType>;
  id: number;
}

type AgentInformationProps = {};

const AgentInformation: FunctionComponent<AgentInformationProps & RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const initialValues: AgentInformationFormValues = {
    state: 'MI',
    agentId: '',
    brokerName: '',
    brokerAddressLine1: '',
    brokerAddressLine2: '',
    brokerCity: '',
    brokerZip: '',
    brokerState: '',
    brokerPhoneNumber: '',
    emailAddress: auth.email,
    cities: [],
    id: 0,
  };

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
    <Card
      cardTitle="Agent Information"
      cardSubtitle="Get started by simply providing your Agent Information"
    >
      <>
        <Seo title="Agent Information" />
        <ProgressBar value={33} label="Step 1/3" name="progress" />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              createAgentProfile({
                ...values,
                brokerZip: String(values.brokerZip),
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
                  />
                </Column>
                <Column md={4}>
                  <Field
                    as={Input}
                    type="select"
                    name="state"
                    label="State"
                    validate={requiredField}
                    disabled
                    options={statesList}
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
                  />
                </Column>
                <Column md={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="brokerPhoneNumber"
                    label="Broker Phone Number"
                    validate={requiredPhoneNumber}
                  />
                </Column>
                <Column>
                  <Field
                    as={Input}
                    type="text"
                    name="brokerAddressLine1"
                    label="Address"
                    validate={requiredField}
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
                  />
                </Column>
                <Column md={3}>
                  <Field
                    as={Input}
                    type="select"
                    name="brokerState"
                    label="State"
                    validate={requiredField}
                    options={statesList}
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
        <Button type="button" onClick={() => save()} color="text" block>
          Save &amp; Complete Later
        </Button>
      </>
    </Card>
  );
};

export default AgentInformation;
