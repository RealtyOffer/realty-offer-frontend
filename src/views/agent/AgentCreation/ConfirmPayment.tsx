import React, { useState, FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { FaRegCheckCircle } from 'react-icons/fa';

import { RouteComponentProps } from '@reach/router';
import {
  Box, Button, FlexContainer, Header, Row, Column,
} from '../../../components';
import { brandSuccess } from '../../../styles/color';
import { fontSizeH1 } from '../../../styles/typography';

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box largePadding>
            {
              !confirmed ? (
                <>
                  <FlexContainer flexDirection="column">
                    <Header>Confirm Payment</Header>
                    <p>Total Amount Due:</p>
                    <Header as="h2">$2,388</Header>
                    <p>Will be paid from Card ending in: 9876</p>
                  </FlexContainer>
                  <Button type="button" color="primary" block onClick={() => setConfirmed(true)}>
                    Confirm Payment
                  </Button>
                  <FlexContainer height="100px">
                    <small>By clicking &quot;Confirm Payment&quot;, I agree to the <Link to="/">Terms &amp; Conditions</Link>.</small>
                  </FlexContainer>
                </>
              ) : (
                <>
                  <FlexContainer flexDirection="column">
                    <FaRegCheckCircle color={brandSuccess} size={fontSizeH1} />
                    <Header>Confirmed!</Header>
                    <p>
                      Text goes here
                    </p>
                  </FlexContainer>
                  <FlexContainer height="100px">
                    <Button type="link" to="/">Get Started</Button>
                  </FlexContainer>
                </>
              )
            }
          </Box>
        </div>
      </Column>
    </Row>
  );
};

export default ConfirmPayment;
