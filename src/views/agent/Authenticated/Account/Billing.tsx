import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { addMonths, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import PaymentIcon from 'react-payment-icons';

import {
  FlexContainer,
  Row,
  Column,
  Box,
  Heading,
  Seo,
  HorizontalRule,
} from '../../../../components';
import { RootState } from '../../../../redux/ducks';
import { getFortispayAccountvaults, getFortispayRecurrings } from '../../../../redux/ducks/fortis';

type BillingProps = {} & RouteComponentProps;

const Billing: FunctionComponent<BillingProps> = () => {
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  useEffect(() => {
    if (agent.fortispayContactId != null) {
      dispatch(
        getFortispayAccountvaults({
          // eslint-disable-next-line @typescript-eslint/camelcase
          contact_id: agent.fortispayContactId,
        })
      );
    }
  }, [agent.fortispayContactId]);

  useEffect(() => {
    if (agent.fortispayRecurringId != null && agent.fortispayContactId != null) {
      dispatch(
        getFortispayRecurrings({
          // eslint-disable-next-line @typescript-eslint/camelcase
          contact_id: agent.fortispayContactId,
        })
      );
    }
  }, [agent.fortispayRecurringId]);

  const recurring = fortis.recurring && fortis.recurring[0];
  const accountVault = fortis.accountVault && fortis.accountVault[0];

  return (
    <div>
      <Seo title="Billing" />
      <Heading>Billing</Heading>

      <Box>
        <Heading as="h2" noMargin>
          Monthly Charges
        </Heading>
        {recurring && accountVault && (
          <>
            <p>
              for {format(new Date(recurring.next_run_date), 'MMM do')} &mdash;{' '}
              {format(addMonths(new Date(recurring.next_run_date), 1), 'MMM do')}
            </p>
            <FlexContainer justifyContent="flex-start">
              <Heading as="h3" styledAs="title">
                ${recurring.transaction_amount}
              </Heading>

              <p style={{ marginLeft: 16 }}>
                Scheduled to come out of card ending in {accountVault.last_four} on{' '}
                {format(new Date(recurring.next_run_date), 'MMMM do')}.
              </p>
            </FlexContainer>
          </>
        )}
        <HorizontalRule />
        <Heading as="h2">Billing Statements</Heading>
        <p>No past billing statements</p>
      </Box>
      <Box>
        <Heading as="h2">Payment Methods</Heading>
        <FlexContainer justifyContent="flex-start" alignItems="flex-start">
          <PaymentIcon
            id="mastercard"
            style={{ marginRight: 16, width: 100 }}
            className="payment-icon"
          />
          <p>
            **** **** **** {accountVault?.last_four}
            <br />
            Expires: {accountVault?.exp_date.slice(0, 2)}/{accountVault?.exp_date.slice(2, 4)}
            <br />
            Billing Zip: {accountVault?.billing_zip}
          </p>
        </FlexContainer>
      </Box>
    </div>
  );
};

export default Billing;
