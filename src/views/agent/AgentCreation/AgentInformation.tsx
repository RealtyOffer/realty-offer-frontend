import React, { FunctionComponent } from 'react'
import { Formik, Field, Form } from 'formik'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import {
  Button,
  Input,
  ProgressBar,
  HorizontalRule,
  Card,
} from '../../../components'
import { requiredField, requiredPhoneNumber } from '../../../utils/validations'
import statesList from '../../../utils/statesList'

interface AgentInformationFormValues {
  state: string
  agentId: string
  brokerName: string
  brokerPhoneNumber: string
}

const AgentInformation: FunctionComponent<RouteComponentProps> = () => {
  const initialValues: AgentInformationFormValues = {
    state: 'MI',
    agentId: '',
    brokerName: '',
    brokerPhoneNumber: '',
  }

  const save = () => {}

  return (
    <Card
      cardTitle="Agent Information"
      cardSubtitle="Get started by simply providing your Agent Information"
    >
      <>
        <ProgressBar value={33} label="Step 1/3" name="progress" />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // eslint-disable-next-line no-alert
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
              navigate('/agent/business-information')
            }, 400)
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
  )
}

export default AgentInformation
