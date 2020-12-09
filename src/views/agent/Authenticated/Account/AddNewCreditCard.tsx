/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../redux/ducks';
import { getFortispayAccountvaults } from '../../../../redux/ducks/fortis';
import { addAlert } from '../../../../redux/ducks/globalAlerts';

type AddNewCreditCardProps = {
  toggleModal: (value: boolean) => void;
};

const AddNewCreditCard: FunctionComponent<AddNewCreditCardProps> = (props) => {
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'object') {
      return undefined;
    }

    const receiveMessage = (event: MessageEvent) => {
      // Make sure the value for allowed matches the domain of the iFrame you are embedding.
      const allowed = process.env.GATSBY_FORTIS_API_URL;
      // Verify sender's identity
      if (event.origin !== allowed) return;

      const response = JSON.parse(event.data);
      if (response && response.avs === 'GOOD') {
        if (window && window.analytics) {
          window.analytics.track('Agent added new payment method', {});
        }
        dispatch(
          addAlert({
            type: 'success',
            message: 'Successfully added new payment method',
          })
        );
        dispatch(getFortispayAccountvaults({ contact_id: agent.fortispayContactId as string }));
      } else if (response && response.avs === 'BAD') {
        dispatch(
          addAlert({
            type: 'danger',
            message: 'We could not verify your credit card details. Please try again later.',
          })
        );
      }

      props.toggleModal(false);
    };

    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const encryptionKey = process.env.GATSBY_FORTIS_HPP_ENCRYPTION_KEY as string;

  const hostedPaymentPageConfig = {
    id: process.env.GATSBY_FORTIS_HPP_ID,
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
  const url = `${process.env.GATSBY_FORTIS_API_URL}/hostedpaymentpage?id=11eb38df43290f2a86948d0a&data=${encodedData}`;

  return (
    <div>
      {url && (
        <iframe
          title="Hosted Payment Page"
          src={url}
          style={{ border: 0, width: '100%', height: 575 }}
        />
      )}
    </div>
  );
};

export default AddNewCreditCard;
