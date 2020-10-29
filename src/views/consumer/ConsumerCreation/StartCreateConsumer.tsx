import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { navigate, Link } from 'gatsby';

import {
  Row,
  Column,
  ClientOnly,
  Box,
  Button,
  Card,
  Heading,
  Seo,
  TimelineProgress,
} from '../../../components';
import { RootState } from '../../../redux/ducks';
import { captureConsumerData } from '../../../redux/ducks/consumer';
import { ConsumerStoreType } from '../../../redux/ducks/consumer.d';
import { getPriceRangesList, getHomeTypesList } from '../../../redux/ducks/dropdowns';
import { getUserCities } from '../../../redux/ducks/user';

type StartCreateConsumerProps = {} & RouteComponentProps;

const StartCreateConsumer: FunctionComponent<StartCreateConsumerProps> = () => {
  const dispatch = useDispatch();
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  const cities = useSelector((state: RootState) => state.user.cities);
  const setCustomerType = (type: ConsumerStoreType['listing']['type']) => {
    dispatch(captureConsumerData({ type, createDateTime: new Date() }));
    navigate(type === 'seller' ? '/consumer/selling' : '/consumer/buying');
  };

  useEffect(() => {
    if (!dropdowns.priceRanges || !dropdowns.priceRanges.list.length) {
      dispatch(getPriceRangesList());
    }
  }, []);

  useEffect(() => {
    if (!cities || !cities.length) {
      dispatch(getUserCities());
    }
  }, []);

  useEffect(() => {
    if (!dropdowns.homeTypes || !dropdowns.homeTypes.list.length) {
      dispatch(getHomeTypesList());
    }
  }, []);

  return (
    <ClientOnly>
      <Seo title="Ready to buy or sell a home?" />
      <TimelineProgress
        items={['Get Started', 'Create Listing', 'Create Account', 'Verify Email']}
        currentStep={1}
      />
      <Card
        fullWidth
        cardTitle="Let's Get Started"
        cardSubtitle="Ready to buy or sell a home? Start by selecting what you are looking to do below."
      >
        <Row>
          <Column md={4}>
            <Box>
              <Heading as="h3" styledAs="subtitle">
                Sell My Home
              </Heading>
              <p>
                Why pay 6 to 8%...
                <br />
                <br /> Within 24 hours, top-rated certified and vetted agents in your area will
                simply offer to charge less commission to win your business!
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
          </Column>
          <Column md={4}>
            <Box>
              <Heading as="h3" styledAs="subtitle">
                Buy A Home
              </Heading>
              <p>
                Imagine getting paid to do it...
                <br />
                <br /> Within 24 hours, multiple agents will offer part of their commission in order
                to be used towards your closing costs and pre-paid items. This means less money you
                bring to the closing table!
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
          </Column>
          <Column md={4}>
            <Box>
              <Heading as="h3" styledAs="subtitle">
                Buy &amp; Sell A Home
              </Heading>
              <p>
                Simple as 1, 2, 3... <br />
                <br />
                Within 24 hours, specialized agents in your area will offer savings on both
                transactions. You will pay less commission to sell your home and receive part of the
                agent’s commission to use towards your closing costs when you buy a home!
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
          </Column>
        </Row>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log In Now</Link>
        </p>
      </Card>
    </ClientOnly>
  );
};

export default StartCreateConsumer;
