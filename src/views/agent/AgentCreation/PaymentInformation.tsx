import React, { FunctionComponent } from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import {
  Button,
  FlexContainer,
  ProgressBar,
  HorizontalRule,
  Card,
} from '../../../components'

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const save = () => {
    // eslint-disable-next-line no-console
    console.log('saved')
  }

  return (
    <Card
      cardTitle="Payment Information"
      cardSubtitle="We will save this information for fast, easy, &amp; convenient in-app purchases"
    >
      <>
        <ProgressBar value={100} label="Step 3/3" name="progress" />
        <FlexContainer height="300px">
          iframe for payment gateway goes here
        </FlexContainer>
        <HorizontalRule />
        <Button
          type="button"
          color="primary"
          block
          onClick={() => navigate('/agent/confirm-payment')}
        >
          Make a Payment
        </Button>
        <Button type="button" onClick={() => save()} color="text" block>
          Save &amp; Complete Later
        </Button>
      </>
    </Card>
  )
}

export default PaymentInformation
