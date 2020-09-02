/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, format } from 'date-fns';

import { RouteComponentProps } from '@reach/router';
import { createFortispayRecurring } from '../../../redux/ducks/fortis';
import { Button, FlexContainer, Heading, Card, Seo, ClientOnly } from '../../../components';
import { ActionResponseType } from '../../../redux/constants';
import { RootState } from '../../../redux/ducks';

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  const fakeConfirmPayment = () => {
    dispatch(
      createFortispayRecurring({
        account_vault_id: '11eaed64b202f80a8dd88b49',
        transaction_amount: '2388',
        interval_type: 'm',
        interval: 1,
        start_date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      })
    ).then((response: ActionResponseType) => {
      alert(response.payload.id);
      if (response && !response.error) {
        setConfirmed(true);
      }
    });
  };

  return (
    <ClientOnly>
      <Card
        cardTitle={confirmed ? 'Confirmed' : 'Confirm Payment'}
        cardSubtitle={
          confirmed ? 'You have successfully completed your profile!' : 'Total Amount Due:'
        }
      >
        <Seo title="Confirm Payment" />
        {confirmed ? (
          <FlexContainer height="100px">
            <Button type="link" to="/agent/listings/new">
              Get Started
            </Button>
          </FlexContainer>
        ) : (
          <FlexContainer justifyContent="center" flexDirection="column">
            <Heading as="h2">$2,388</Heading>
            <p>Will be paid from Card ending in: 9876</p>
            <Button type="button" color="primary" block onClick={() => fakeConfirmPayment()}>
              Confirm Payment
            </Button>
            <FlexContainer height="100px">
              <small>
                By clicking &quot;Confirm Payment&quot;, I agree to the{' '}
                <a href="/terms" target="_blank">
                  Terms &amp; Conditions
                </a>
                .
              </small>
            </FlexContainer>
          </FlexContainer>
        )}
      </Card>
    </ClientOnly>
  );
};

export default ConfirmPayment;
