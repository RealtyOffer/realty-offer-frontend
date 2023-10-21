/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

import {
  getFortispayAccountvaults,
  deleteFortispayAccountvault,
  getFortispayTransactions,
} from '../../../redux/ducks/fortis';
import { updateAgentProfile } from '../../../redux/ducks/agent';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { FortispayTransactionResponseType } from '../../../redux/ducks/fortis.d';
import {
  Button,
  HorizontalRule,
  Card,
  Seo,
  TimelineProgress,
  LoadingPage,
} from '../../../components';
import { RootState } from '../../../redux/ducks';
import { ActionResponseType } from '../../../redux/constants';
import trackEvent from '../../../utils/analytics';

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agent);

  useEffect(() => {
    if (!agent.fortispayContactId) {
      trackEvent('Agent redirect from payment info to agent info', agent);
      navigate('/agent/agent-information');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'object') {
      return undefined;
    }

    const receiveMessage = (event: MessageEvent) => {
      // Make sure the value for allowed matches the domain of the iFrame you are embedding.
      const allowed =
        process.env.GATSBY_ENVIRONMENT === 'DEVELOP'
          ? process.env.GATSBY_DEV_FORTISPAY_API_URL
          : process.env.GATSBY_FORTISPAY_API_URL;
      // Verify sender's identity
      if (event.origin !== allowed) return;

      const response = JSON.parse(event.data);

      // AVS Good means card has been validated with issuer to be legit
      if (response && response.avs === 'GOOD') {
        trackEvent('Agent added new payment method', {});

        dispatch(getFortispayTransactions({ contact_id: agent.fortispayContactId as string })).then(
          (transactionsResponse: { payload: Array<FortispayTransactionResponseType> }) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const recentTransaction = transactionsResponse.payload[0]!;
            dispatch(
              updateAgentProfile({
                ...agent,
                fortispayAccountVaultId: recentTransaction.account_vault_id,
              })
            ).then((res: ActionResponseType) => {
              if (res && !res.error) {
                dispatch(
                  addAlert({
                    type: 'success',
                    message: 'Successfully added new payment method',
                  })
                );
                trackEvent('Agent completed payment info', {
                  ...agent,
                  fortispayAccountVaultId: recentTransaction.account_vault_id,
                });
                navigate('/agent/confirm-registration');
              }
            });
          }
        );
      } else if (response && response.avs !== 'GOOD') {
        // AVS can also be STREET, ZIP, or BAD, meaning contact info did not validate. we dont care
        // which it is, so we get the list of transactions from Fortis, find the latest one added
        // from Hosted Payment Page interaction, and then delete the Account Vault it created
        dispatch(getFortispayTransactions({ contact_id: agent.fortispayContactId as string })).then(
          (transactionsResponse: { payload: Array<FortispayTransactionResponseType> }) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const recentTransaction = transactionsResponse.payload.find(
              (t) => t.id === response.transaction_id
            )!;
            dispatch(deleteFortispayAccountvault({ id: recentTransaction.account_vault_id })).then(
              () => {
                dispatch(
                  addAlert({
                    type: 'danger',
                    message:
                      'We could not verify your credit card details. Please double check that you entered everything correctly.',
                  })
                );
                // refetch account vaults to the latest just in case
                dispatch(
                  getFortispayAccountvaults({ contact_id: agent.fortispayContactId as string })
                );
              }
            );
          }
        );
      }
    };

    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const encryptionKey = (process.env.GATSBY_ENVIRONMENT === 'DEVELOP'
    ? process.env.GATSBY_DEV_FORTISPAY_HPP_ENCRYPTION_KEY
    : process.env.GATSBY_FORTISPAY_HPP_ENCRYPTION_KEY) as string;

  const hostedPaymentPageConfig = {
    id:
      process.env.GATSBY_ENVIRONMENT === 'DEVELOP'
        ? process.env.GATSBY_DEV_FORTISPAY_HPP_ID
        : process.env.GATSBY_FORTISPAY_HPP_ID,
    stylesheet_url: 'https://realtyoffer.com/css/fortis.css',
    field_configuration: {
      body: {
        fields: [
          {
            id: 'transaction_amount',
            value: '0.00',
            label: 'Amount',
            readonly: true,
            visible: false,
          },
          {
            id: 'action',
            value: 'avsonly',
            visible: false,
          },
          {
            id: 'contact_id',
            value: agent.fortispayContactId,
            visible: false,
          },
          {
            id: 'save_account',
            value: true,
            visible: false,
          },
        ],
      },
    },
  };

  const stringifiedConfig = JSON.stringify(hostedPaymentPageConfig);
  const encryptedData = CryptoJS.AES.encrypt(stringifiedConfig, encryptionKey).toString();
  const encodedData = encodeURIComponent(encryptedData);
  const url = `${
    process.env.GATSBY_ENVIRONMENT === 'DEVELOP'
      ? process.env.GATSBY_DEV_FORTISPAY_API_URL
      : process.env.GATSBY_FORTISPAY_API_URL
  }/hostedpaymentpage?id=${
    process.env.GATSBY_ENVIRONMENT === 'DEVELOP'
      ? process.env.GATSBY_DEV_FORTISPAY_HPP_ID
      : process.env.GATSBY_FORTISPAY_HPP_ID
  }&data=${encodedData}`;

  return (
    <>
      <Seo title="Payment Information" />
      <TimelineProgress
        items={[
          'Create Account',
          'Verify Email',
          'Agent Info',
          'Business Info',
          'Payment Info',
          'Confirm',
        ]}
        currentStep={5}
      />
      <Card
        cardTitle="Payment Information"
        cardSubtitle="You will need a payment method on file before you can bid on listings"
      >
        {url && !agent.isLoading && (
          <iframe
            title="Hosted Payment Page"
            src={url}
            style={{ border: 0, width: '100%', height: 800 }}
          />
        )}
        {agent.isLoading && <LoadingPage />}
        <HorizontalRule />
        <Button type="button" onClick={() => {}} color="text" block>
          Save &amp; Complete Later
        </Button>
      </Card>
    </>
  );
};

export default PaymentInformation;
