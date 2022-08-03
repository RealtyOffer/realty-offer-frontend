/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, FunctionComponent } from 'react';
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
import { addAlert } from '../../../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../../../utils/postFormUrlEncoded';

const ConfirmRegistration: FunctionComponent<RouteComponentProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const auth = useSelector((state: RootState) => state.auth);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const subscriberType = agent.cities && agent.cities.length > 0 ? 'monthly' : 'payAsYouGo';

  useEffect(() => {
    if (!agent.fortispayContactId) {
      navigate('/agent/agent-information');
    }
    if (!agent.isPilotUser && !agent.fortispayAccountVaultId) {
      navigate('/agent/payment-information');
    }
  }, []);

  const completeSignup = () => {
    if (process.env.GATSBY_ENVIRONMENT !== 'DEVELOP') {
      postFormUrlEncoded('new-agent-account-created', {
        subject: `New Agent Account Created: ${auth.firstName} ${auth.lastName}`,
        firstName: auth.firstName,
        lastName: auth.lastName,
        email: auth.email,
        phoneNumber: auth.phoneNumber,
        isPilotUser: agent.signupData.isPilotUser,
        agentId: agent.agentId,
        brokerName: agent.brokerName,
        brokerAddressLine1: agent.brokerAddressLine1,
        brokerAddressLine2: agent.brokerAddressLine2,
        brokerCity: agent.brokerCity,
        brokerZip: agent.brokerZip,
        brokerState: 'MI',
        brokerPhoneNumber: agent.brokerPhoneNumber,
        brokerEmail: agent.brokerEmail,
        subscriberType,
        referralSource: agent.signupData.referralSource,
      });
    }
    if (agent.isPilotUser) {
      dispatch(clearAgentSignupData());
      dispatch(
        addAlert({
          type: 'success',
          message:
            'You have successfully completed your profile! You can now view listings and bid on them.',
        })
      );
      navigate('/agent/listings/new');
    } else if (subscriberType === 'payAsYouGo' && agent.fortispayAccountVaultId) {
      dispatch(clearAgentSignupData());
      dispatch(
        addAlert({
          type: 'success',
          message:
            'You have successfully completed your profile! You can now view listings and bid on them.',
        })
      );
      navigate('/agent/listings/new');
    } else if (
      subscriberType === 'monthly' &&
      agent.fortispayAccountVaultId &&
      agent.fortispayRecurringAmount
    ) {
      dispatch(
        createFortispayRecurring({
          account_vault_id: agent.fortispayAccountVaultId,
          transaction_amount: agent.fortispayRecurringAmount?.toString(),
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
              dispatch(
                addAlert({
                  type: 'success',
                  message:
                    'You have successfully completed your profile! You can now view listings and bid on them.',
                })
              );
              navigate('/agent/listings/new');
            }
          });
        }
      });
    } else {
      dispatch(
        addAlert({
          type: 'danger',
          message: 'Something went wrong, please try again.',
        })
      );
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
      <Seo title="Confirm Registration">
        <script type="text/javascript">
          {`window.gtag('event', 'conversion', { send_to: 'AW-325206149/Qr8MCIrrt-ECEIWBiZsB' })`}
        </script>
      </Seo>
      <TimelineProgress
        items={
          agent && agent.isPilotUser
            ? ['Create Account', 'Verify Email', 'Agent Info', 'Confirm']
            : [
                'Create Account',
                'Verify Email',
                'Agent Info',
                'Business Info',
                'Payment Info',
                'Confirm',
              ]
        }
        currentStep={agent && agent.isPilotUser ? 4 : 6}
      />
      <Card cardTitle="Confirm Registration">
        <>
          {fortis.isLoading ? (
            <LoadingPage />
          ) : (
            <FlexContainer justifyContent="center" flexDirection="column">
              {subscriberType === 'payAsYouGo' &&
                fortis.accountVaults &&
                fortis.accountVaults.length > 0 && (
                  <>
                    <Heading as="h2">Pay as You Go</Heading>
                    <p>
                      You will be charged $295 for each awarded bid from Card ending in{' '}
                      {fortis.accountVaults[0].last_four}.{' '}
                      <strong>You will not be charged today</strong>.
                    </p>
                  </>
                )}
              {subscriberType === 'monthly' &&
                !agent.isPilotUser &&
                fortis.accountVaults &&
                fortis.accountVaults.length > 0 && (
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
                    {!agent.isPilotUser &&
                      agent.cities &&
                      agent.cities.length > 0 &&
                      agent.fortispayRecurringAmount && (
                        <p>
                          ${numberWithCommas(agent.fortispayRecurringAmount)} will be paid from Card
                          ending in {fortis.accountVaults[0].last_four}
                        </p>
                      )}
                  </>
                )}

              {subscriberType === 'monthly' && agent.isPilotUser && (
                <>
                  <Heading as="h2">Monthly Subscription</Heading>
                  <p>
                    You have signed up as a Pilot User for unlimited access to{' '}
                    <strong>{agent.cities?.length} cities</strong> on a monthly basis, expiring{' '}
                    {agent.licenseExpirationDate &&
                      format(new Date(agent.licenseExpirationDate), 'MM/dd/yyyy')}
                    .
                  </p>
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
      </Card>
    </>
  );
};

export default ConfirmRegistration;
