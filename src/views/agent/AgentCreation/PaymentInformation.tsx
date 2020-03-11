import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';


import {
  Box, Button, FlexContainer, Header, Row, Column, ProgressBar, HorizontalRule,
} from '../../../components';

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const save = () => {
    // eslint-disable-next-line no-console
    console.log('saved');
  };

  return (
    <Row>
      <Column md={6} mdOffset={3}>
        <div>
          <Box largePadding>
            <FlexContainer flexDirection="column">
              <Header>Payment Information</Header>
              <p>We will save this information for fast, easy, &amp; convenient in-app purchases</p>
            </FlexContainer>
            <ProgressBar value={100} label="Step 3/3" name="progress" />
            <FlexContainer height="300px">
              iframe for payment gateway goes here
            </FlexContainer>
            <HorizontalRule />
            <Button type="button" color="primary" block onClick={() => navigate('/agent/confirm-payment')}>
              Make a Payment
            </Button>
            <Button type="button" onClick={() => save()} color="text" block>
              Save &amp; Complete Later
            </Button>
          </Box>
        </div>
      </Column>
    </Row>
  );
};

export default PaymentInformation;
