import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import {
  Button, Input, ProgressBar, HorizontalRule, Card,
} from '../../../components';
import { requiredField, requiredPhoneNumber } from '../../../utils/validations';

interface AgentInformationFormValues {
  state?: string;
  agentId?: string;
  brokerName?: string;
  brokerPhoneNumber?: string;
}

const AgentInformation: FunctionComponent<RouteComponentProps> = () => {
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
        <ProgressBar value={33} label="Step 1/3" name="progress" />
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // eslint-disable-next-line no-alert
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              navigate('/agent/business-information');
            }, 400);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field
                as={Input}
                type="select"
                name="state"
                label="State"
                validate={requiredField}
                disabled
              >
                <option value="">Select a State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Field>
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
