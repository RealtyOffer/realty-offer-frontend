/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, format } from 'date-fns';

import { RouteComponentProps } from '@reach/router';
import { createFortispayRecurring, getFortispayAccountvaults } from '../../../redux/ducks/fortis';
import {
  Button,
  FlexContainer,
  Heading,
  Card,
  Seo,
  TimelineProgress,
  LoadingPage,
} from '../../../components';
import { ActionResponseType } from '../../../redux/constants';
import { RootState } from '../../../redux/ducks';
import { updateAgentProfile } from '../../../redux/ducks/agent';

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const getTotal = () => {
    return agent.cities?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  const confirmPayment = () => {
    if (agent.fortispayAccountVaultId) {
      dispatch(
        createFortispayRecurring({
          account_vault_id: agent.fortispayAccountVaultId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          transaction_amount: getTotal()?.toString() || agent.signupData.total?.toString()!,
          interval_type: 'm',
          interval: 1,
          start_date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        })
      ).then((response: ActionResponseType) => {
        if (response && !response.error) {
          dispatch(
            updateAgentProfile({
              ...agent,
              fortispayRecurringId: response.payload.id,
              hasCompletedSignup: true,
            })
          ).then((res: ActionResponseType) => {
            if (res && !res.error) {
              setConfirmed(true);
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (agent.fortispayContactId && fortis.accountVaults.length === 0) {
      dispatch(
        getFortispayAccountvaults({
          // eslint-disable-next-line @typescript-eslint/camelcase
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          contact_id: agent.fortispayContactId,
        })
      );
    }
  }, [agent]);

  const numberWithCommas = (x: number) => {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  return (
    <>
      <Seo title="Confirm Payment" />
      <TimelineProgress
        items={[
          'Create Account',
          'Verify Email',
          'Agent Info',
          'Business Info',
          'Payment',
          'Confirm',
        ]}
        currentStep={6}
      />
      <Card
        cardTitle={confirmed ? 'Confirmed' : 'Confirm Payment'}
        cardSubtitle={
          confirmed ? 'You have successfully completed your profile!' : 'Total Amount Due:'
        }
      >
        {confirmed ? (
          <FlexContainer height="100px">
            <Button type="link" to="/agent/listings/new">
              Get Started
            </Button>
          </FlexContainer>
        ) : (
          <>
            {fortis.isLoading || !fortis.accountVaults ? (
              <LoadingPage />
            ) : (
              <FlexContainer justifyContent="center" flexDirection="column">
                <Heading as="h2">
                  ${numberWithCommas(agent.signupData.total || getTotal() || 0)}
                </Heading>

                <p>Will be paid from Card ending in: {fortis.accountVaults[0].last_four}</p>
                <Button
                  type="button"
                  color="primary"
                  block
                  onClick={() => confirmPayment()}
                  disabled={fortis.isLoading || agent.isLoading}
                  isLoading={fortis.isLoading || agent.isLoading}
                >
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
          </>
        )}
      </Card>
    </>
  );
};

export default ConfirmPayment;
