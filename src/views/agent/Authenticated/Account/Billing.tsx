/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { addMonths, format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import PaymentIcon from 'react-payment-icons';
import { FaTrash, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

import {
  Button,
  FlexContainer,
  Box,
  Heading,
  Seo,
  Modal,
  HorizontalRule,
  Column,
  Row,
} from '../../../../components';
import AddNewCreditCard from './AddNewCreditCard';
import { RootState } from '../../../../redux/ducks';
import {
  getFortispayAccountvaults,
  getFortispayRecurrings,
  getFortispayTransactions,
  editFortispayRecurring,
  deleteFortispayAccountvault,
} from '../../../../redux/ducks/fortis';
import { getAgentProfile, updateAgentProfile } from '../../../../redux/ducks/agent';
import TransactionsTable from './TransactionsTable';
import SubscriptionsTable from './SubscriptionsTable';
import { getStatesList } from '../../../../redux/ducks/dropdowns';
import { getCreditCardIconType, getCreditCardType } from '../../../../components/CreditCard';
import { baseSpacer } from '../../../../styles/size';
import { ActionResponseType } from '../../../../redux/constants';
import { addAlert } from '../../../../redux/ducks/globalAlerts';
import { getUserCounties, getUserCities } from '../../../../redux/ducks/user';
import numberWithCommas from '../../../../utils/numberWithCommas';
import AddNewCityToSubscription from './AddNewCityToSubscription';
import { FortispayAccountvaultResponseType } from '../../../../redux/ducks/fortis.d';
import trackEvent from '../../../../utils/analytics';

type BillingProps = {} & RouteComponentProps;

const Billing: FunctionComponent<BillingProps> = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();
  const countiesList = useSelector((state: RootState) => state.user.counties);
  const citiesList = useSelector((state: RootState) => state.user.cities);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);

  const [addCityModalIsOpen, setAddCityModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [removeCardModalIsOpen, setRemoveCardModalIsOpen] = useState(false);
  const [
    activeAccountVaultToBeRemoved,
    setActiveAccountVaultToBeRemoved,
  ] = useState<FortispayAccountvaultResponseType | null>(null);

  useEffect(() => {
    dispatch(getAgentProfile());
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
    if (!citiesList || citiesList.length === 0) {
      dispatch(getUserCities());
    }
    if (!countiesList || countiesList.length === 0) {
      dispatch(getUserCounties());
    }
  }, []);

  useEffect(() => {
    if (agent.fortispayContactId != null) {
      dispatch(getFortispayAccountvaults({ contact_id: agent.fortispayContactId }));
      dispatch(getFortispayTransactions({ contact_id: agent.fortispayContactId }));
      dispatch(getFortispayRecurrings({ contact_id: agent.fortispayContactId }));
    }
  }, [agent.fortispayContactId, agent.fortispayRecurringId]);

  const recurring = fortis.recurring && fortis.recurring[0];

  const makeDefaultPaymentMethod = (id: string) => {
    dispatch(editFortispayRecurring({ ...recurring, account_vault_id: id })).then(
      (response: ActionResponseType) => {
        if (response && !response.error && agent.fortispayContactId != null) {
          dispatch(updateAgentProfile({ ...agent, fortispayAccountVaultId: id })).then(
            (res: ActionResponseType) => {
              if (res && !res.error) {
                trackEvent('Agent updated default payment method', {
                  user: auth.email,
                });

                dispatch(
                  addAlert({
                    type: 'success',
                    message: 'Successfully updated payment method',
                  })
                );
              }
            }
          );
          dispatch(getFortispayAccountvaults({ contact_id: agent.fortispayContactId }));
        }
      }
    );
  };

  const deleteAccountVault = (id: string) => {
    dispatch(deleteFortispayAccountvault({ id })).then((response: ActionResponseType) => {
      if (response && !response.error) {
        trackEvent('Agent removed payment method', {
          user: auth.email,
        });

        dispatch(
          addAlert({
            type: 'success',
            message: 'Successfully removed payment method',
          })
        );
      }
    });
  };

  return (
    <div>
      <Seo title="Billing" />
      <Heading>Billing</Heading>

      <Box>
        {agent.cities && agent.cities.length === 0 ? (
          <>
            <Heading as="h2">Current Plan: Pay As You Go</Heading>
            <FlexContainer justifyContent="flex-start">
              <Heading as="h3" styledAs="title">
                $295
              </Heading>

              <p style={{ marginLeft: 16 }}>
                Will come out of card ending in{' '}
                {
                  fortis.accountVaults.find((accountVault) => !accountVault.has_recurring)
                    ?.last_four
                }{' '}
                when you are awarded a bid.
              </p>
            </FlexContainer>
            <HorizontalRule />
            <p>
              You can also switch to a Monthly Subscription by adding cities. For listings outside
              your subscription area, you will still pay a one-time fee of $295 for access to the
              consumer&apos;s information.
            </p>
            <Button type="button" onClick={() => setAddCityModalIsOpen(true)}>
              Add Cities
            </Button>
          </>
        ) : (
          <>
            <Heading as="h2">Monthly Charges</Heading>
            {fortis.isLoading && <Skeleton count={5} />}
            {!fortis.isLoading &&
              recurring &&
              fortis.accountVaults &&
              fortis.accountVaults.length > 0 && (
                <>
                  <p>
                    for {format(new Date(parseISO(recurring.next_run_date)), 'MMM do')} &mdash;{' '}
                    {format(addMonths(new Date(parseISO(recurring.next_run_date)), 1), 'MMM do')}
                  </p>
                  <FlexContainer justifyContent="flex-start">
                    <Heading as="h3" styledAs="title">
                      ${numberWithCommas(Number(recurring.transaction_amount))}
                    </Heading>

                    <p style={{ marginLeft: 16 }}>
                      Scheduled to come out of card ending in{' '}
                      {
                        fortis.accountVaults.find((accountVault) => accountVault.has_recurring)
                          ?.last_four
                      }{' '}
                      on {format(new Date(parseISO(recurring.next_run_date)), 'MMMM do')}.
                    </p>
                  </FlexContainer>
                  {agent && agent.cities && agent.cities.length > 0 && (
                    <>
                      <p>Your sales area currently includes:</p>
                      <SubscriptionsTable cities={agent.cities} isLoading={agent.isLoading} />
                      <Button type="button" onClick={() => setAddCityModalIsOpen(true)}>
                        Add More Cities
                      </Button>
                    </>
                  )}
                </>
              )}
            {!fortis.isLoading && !recurring && !agent.isPilotUser && (
              <p>No current monthly charges</p>
            )}
            {!fortis.isLoading && agent.isPilotUser && (
              <p>
                You are a Pilot user and are receiving access to{' '}
                <strong>{agent.cities?.length} cities</strong> for free{' '}
                {agent.licenseExpirationDate && (
                  <>
                    until{' '}
                    <strong>
                      {format(
                        new Date(parseISO(agent.licenseExpirationDate as string)),
                        'MM/dd/yyyy'
                      )}
                    </strong>
                  </>
                )}
                .
              </p>
            )}
          </>
        )}
        <AddNewCityToSubscription
          toggleModal={setAddCityModalIsOpen}
          modalIsOpen={addCityModalIsOpen}
        />
      </Box>

      <Box>
        <Heading as="h2">Payment Methods</Heading>
        {fortis.isLoading && <Skeleton count={5} />}
        {!fortis.isLoading &&
          fortis.accountVaults &&
          fortis.accountVaults.length > 0 &&
          fortis.accountVaults.map((accountVault) => (
            <div key={accountVault.id} style={{ marginBottom: baseSpacer }}>
              <FlexContainer justifyContent="space-between">
                <div>
                  <PaymentIcon
                    id={getCreditCardIconType(getCreditCardType(accountVault.first_six))}
                    style={{ width: 48, marginRight: 8 }}
                  />
                  {getCreditCardType(accountVault.first_six)
                    .charAt(0)
                    .toUpperCase() + getCreditCardType(accountVault.first_six).slice(1)}{' '}
                  ending in {accountVault.last_four}, exp.{' '}
                  {`${accountVault.exp_date.slice(0, 2)}/${accountVault.exp_date.slice(2, 4)}`}
                </div>
                {accountVault.has_recurring || accountVault.id === agent.fortispayAccountVaultId ? (
                  <div>
                    <Button
                      type="button"
                      color="successOutline"
                      disabled
                      iconLeft={<FaCheckCircle />}
                      rightspacer
                    >
                      Default
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setRemoveCardModalIsOpen(true)}
                      color="dangerOutline"
                      iconLeft={<FaTrash />}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      type="button"
                      onClick={() => makeDefaultPaymentMethod(accountVault.id)}
                      iconLeft={<FaRegCheckCircle />}
                      color="primaryOutline"
                      rightspacer
                    >
                      Set as Default
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setRemoveCardModalIsOpen(true);
                        setActiveAccountVaultToBeRemoved(accountVault);
                      }}
                      color="dangerOutline"
                      iconLeft={<FaTrash />}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </FlexContainer>
              <HorizontalRule />
            </div>
          ))}
        <Button type="button" onClick={() => setModalIsOpen(true)}>
          Add New Payment Method
        </Button>
        <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
          <AddNewCreditCard toggleModal={() => setModalIsOpen(false)} />
        </Modal>
        <Modal
          toggleModal={() => {
            setRemoveCardModalIsOpen(false);
            setActiveAccountVaultToBeRemoved(null);
          }}
          isOpen={removeCardModalIsOpen}
        >
          <Heading>Remove Payment Method</Heading>

          {activeAccountVaultToBeRemoved ? (
            <p>Are you sure you want to remove this payment method?</p>
          ) : (
            <p>
              This card is currently your default payment method. You must first change your default
              to a new card before you can remove this card.
            </p>
          )}
          <Row>
            <Column xs={6}>
              <Button
                type="button"
                block
                color="primaryOutline"
                onClick={() => {
                  setRemoveCardModalIsOpen(false);
                  setActiveAccountVaultToBeRemoved(null);
                }}
              >
                Cancel
              </Button>
            </Column>
            <Column xs={6}>
              {activeAccountVaultToBeRemoved && (
                <Button
                  block
                  type="button"
                  color="danger"
                  onClick={() => {
                    deleteAccountVault(activeAccountVaultToBeRemoved.id);
                    setRemoveCardModalIsOpen(false);
                    setActiveAccountVaultToBeRemoved(null);
                  }}
                >
                  Remove
                </Button>
              )}
            </Column>
          </Row>
        </Modal>
      </Box>

      <Box>
        <Heading as="h2">Billing Statements</Heading>
        {!fortis.isLoading &&
        fortis.accountVaults &&
        fortis.accountVaults.length > 0 &&
        fortis.transactions &&
        fortis.transactions.filter((t) => t.transaction_amount !== '0.00').length >= 1 ? (
          <TransactionsTable transactions={fortis.transactions} />
        ) : (
          <>{!fortis.isLoading ? <p>No past billing statements</p> : <Skeleton count={5} />}</>
        )}
      </Box>
    </div>
  );
};

export default Billing;
