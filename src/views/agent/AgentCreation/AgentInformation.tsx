import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { Button, Input, ProgressBar, HorizontalRule, Card, Seo } from '../../../components';
import { requiredField, requiredPhoneNumber } from '../../../utils/validations';
import statesList from '../../../utils/statesList';
import { createAgentProfile } from '../../../redux/ducks/agent';
import { ActionResponseType } from '../../../redux/constants';

interface AgentInformationFormValues {
  state: string;
  agentId: string;
  brokerName: string;
  brokerPhoneNumber: string;
}

type AgentInformationProps = {};

const AgentInformation: FunctionComponent<AgentInformationProps & RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const initialValues: AgentInformationFormValues = {
    state: 'MI',
    agentId: '',
    brokerName: '',
    brokerPhoneNumber: '',
  };

  const save = () => {};

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
            dispatch(createAgentProfile(values)).then((response: ActionResponseType) => {
              setSubmitting(false);
              if (response && !response.error) {
                navigate('/agent/business-information');
              }
            });
          }}
        >
          {({ isSubmitting, isValid, ...rest }) => (
            <Form>
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
