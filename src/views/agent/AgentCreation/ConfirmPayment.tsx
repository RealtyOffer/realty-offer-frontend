/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, format } from 'date-fns';
import { navigate } from 'gatsby';

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
import { clearAgentSignupData, updateAgentProfile } from '../../../redux/ducks/agent';
import numberWithCommas from '../../../utils/numberWithCommas';

const ConfirmPayment: FunctionComponent<RouteComponentProps> = () => {
  const [confirmed, setConfirmed] = useState(false);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const subscriberType = agent.cities && agent.cities.length > 0 ? 'monthly' : 'payAsYouGo';

  useEffect(() => {
    if (!agent.fortispayContactId) {
      navigate('/agent/agent-information');
    }
    if (!agent.fortispayAccountVaultId) {
      navigate('/agent/payment-information');
    }
  }, []);

  const completeSignup = () => {
    if (agent.fortispayAccountVaultId) {
      if (agent.isPilotUser) {
        setConfirmed(true);
        dispatch(clearAgentSignupData());
      }
      if (subscriberType === 'payAsYouGo') {
        setConfirmed(true);
        dispatch(clearAgentSignupData());
      }
      if (subscriberType === 'monthly' && agent.signupData.total) {
        dispatch(
          createFortispayRecurring({
            account_vault_id: agent.fortispayAccountVaultId,
            transaction_amount: agent.signupData.total?.toString(),
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
              })
            ).then((res: ActionResponseType) => {
              if (res && !res.error) {
                setConfirmed(true);
              }
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    if (agent.fortispayContactId && fortis.accountVaults.length === 0) {
      dispatch(
        getFortispayAccountvaults({
          contact_id: agent.fortispayContactId,
        })
      );
    }
  }, [agent]);

  return (
    <>
      <Seo title="Confirm Payment" />
      <TimelineProgress
        items={
          agent && agent.signupData.isPilotUser
            ? ['Create Account', 'Verify Email', 'Agent Info', 'Payment Info', 'Confirm']
            : [
                'Create Account',
                'Verify Email',
                'Agent Info',
                'Business Info',
                'Payment Info',
                'Confirm',
              ]
        }
        currentStep={agent && agent.signupData.isPilotUser ? 5 : 6}
      />
      <Card
        cardTitle={confirmed ? 'Confirmed' : 'Confirm Payment Method'}
        cardSubtitle={
          confirmed
            ? 'You have successfully completed your profile! You can now view listings and bid on them.'
            : ''
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
            {fortis.isLoading || !fortis.accountVaults || fortis.accountVaults.length === 0 ? (
              <LoadingPage />
            ) : (
              <FlexContainer justifyContent="center" flexDirection="column">
                {subscriberType === 'payAsYouGo' ? (
                  <>
                    <Heading as="h2">Pay as You Go</Heading>
                    <p>
                      You will be charged $295 for each awarded bid from Card ending in{' '}
                      {fortis.accountVaults[0].last_four}.{' '}
                      <strong>You will not be charged today</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <Heading as="h2">Monthly Subscription</Heading>
                    <p>
                      You have signed up for unlimited access to{' '}
                      <strong>
                        {agent.cities?.length === 1 ? '1 city' : `${agent.cities?.length} cities`}
                      </strong>{' '}
                      on a monthly basis, expiring{' '}
                      {agent.licenseExpirationDate &&
                        format(new Date(agent.licenseExpirationDate), 'MM/dd/yyyy')}
                      .
                    </p>
                    {!agent.isPilotUser && agent.signupData.total && (
                      <p>
                        {numberWithCommas(agent.signupData.total)} will be paid from Card ending in:{' '}
                        {fortis.accountVaults[0].last_four}
                      </p>
                    )}
                  </>
                )}

                <Button
                  type="button"
                  color="primary"
                  block
                  onClick={() => completeSignup()}
                  disabled={fortis.isLoading || agent.isLoading}
                  isLoading={fortis.isLoading || agent.isLoading}
                >
                  Complete Signup
                </Button>
                <FlexContainer height="100px">
                  <small>
                    By clicking &quot;Complete Signup&quot;, I agree to the{' '}
                    <a
                      href={agent.isPilotUser ? '/pilot-terms' : '/terms'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Use
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
