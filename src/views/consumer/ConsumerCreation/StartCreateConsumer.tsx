import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';

import { ClientOnly, Box, Button, Card, Heading, Seo } from '../../../components';
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
    dispatch(captureConsumerData({ type }));
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
              Within 24 hours, multiple agents will offer less than commission to sell your home, in
              order to win your business!
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
              Within 24 hours, multiple agents will offer part of their commission in order to pay
              for your closing costs, in order to win your business!
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
              Within 24 hours, multiple agents will offer less commission to sell your home, or part
              of their commission to find you a home!
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
    </ClientOnly>
  );
};

export default StartCreateConsumer;
