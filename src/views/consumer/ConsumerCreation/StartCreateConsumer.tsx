import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaCaretRight } from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigate } from 'gatsby';

import { Box, Button, Card, Heading, Seo } from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';

type StartCreateConsumerProps = {
  actions: {
    captureConsumerData: Function;
  };
} & RouteComponentProps;

const StartCreateConsumer: FunctionComponent<StartCreateConsumerProps> = props => {
  const setCustomerType = (
    consumerType: 'buyer' | 'seller' | 'buyerSeller',
  ) => {
    props.actions.captureConsumerData({ consumerType });
    navigate(
      consumerType === 'seller' ? '/consumer/selling' : '/consumer/buying',
    );
  };

  return (
    <>
      <Seo title="Ready to buy or sell a home?" />
      <Card
        cardTitle="Ready to buy or sell a home?"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <Box>
            <Heading as="h3" styledAs="subtitle">
              Sell My Home
            </Heading>
            <p>
              Within 24 hours, multiple agents will offer less than commission
              to sell your home, in order to win your business!
            </p>
            <Button
              type="button"
              onClick={() => setCustomerType('seller')}
              block
              iconRight={<FaCaretRight />}
            >
              Sell Your Home
            </Button>
          </Box>
          <Box>
            <Heading as="h3" styledAs="subtitle">
              Buy A Home
            </Heading>
            <p>
              Within 24 hours, multiple agents will offer part of their
              commission in order to pay for your closing costs, in order to win
              your business!
            </p>
            <Button
              type="button"
              onClick={() => setCustomerType('buyer')}
              block
              iconRight={<FaCaretRight />}
            >
              Buy A Home
            </Button>
          </Box>
          <Box>
            <Heading as="h3" styledAs="subtitle">
              Buy &amp; Sell A Home
            </Heading>
            <p>
              Within 24 hours, multiple agents will offer less commission to
              sell your home, or part of their commission to find you a home!
            </p>
            <Button
              type="button"
              onClick={() => setCustomerType('buyerSeller')}
              block
              iconRight={<FaCaretRight />}
            >
              Buy &amp; Sell A Home
            </Button>
          </Box>
        </>
      </Card>
    </>
  );
};

export default connect(null, dispatch => ({
  actions: bindActionCreators({ captureConsumerData }, dispatch),
}))(StartCreateConsumer);
