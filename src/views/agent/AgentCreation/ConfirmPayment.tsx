import React, { useState, FunctionComponent } from 'react'
import { Link } from 'gatsby'

import { RouteComponentProps } from '@reach/router'
import { Button, FlexContainer, Heading, Card } from '../../../components'

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <Card
      cardTitle={confirmed ? 'Confirmed!' : 'Confirm Payment'}
      cardSubtitle={confirmed ? 'Todo: Text goes here' : 'Total Amount Due:'}
    >
      {confirmed ? (
        <FlexContainer height="100px">
          <Button type="link" to="/">
            Get Started
          </Button>
        </FlexContainer>
      ) : (
        <FlexContainer justifyContent="center" flexDirection="column">
          <Heading as="h2">$2,388</Heading>
          <p>Will be paid from Card ending in: 9876</p>
          <Button
            type="button"
            color="primary"
            block
            onClick={() => setConfirmed(true)}
          >
            Confirm Payment
          </Button>
          <FlexContainer height="100px">
            <small>
              By clicking &quot;Confirm Payment&quot;, I agree to the{' '}
              <Link to="/">Terms &amp; Conditions</Link>.
            </small>
          </FlexContainer>
        </FlexContainer>
      )}
    </Card>
  )
}

export default ConfirmPayment
