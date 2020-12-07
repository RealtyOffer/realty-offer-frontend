/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { format, parseISO, formatISO } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

import { Button, Column, Heading, Modal, Row, Table } from '../../../../components';
import { CityType } from '../../../../redux/ducks/admin.d';
import { RootState } from '../../../../redux/ducks';
import numberWithCommas from '../../../../utils/numberWithCommas';
import { editFortispayRecurring, getFortispayAccountvaults } from '../../../../redux/ducks/fortis';
import { ActionResponseType } from '../../../../redux/constants';
import { updateAgentProfile } from '../../../../redux/ducks/agent';
import { addAlert } from '../../../../redux/ducks/globalAlerts';
import { getUserCities, getUserCounties } from '../../../../redux/ducks/user';

type SubscriptionsTableProps = {
  cities: Array<CityType>;
};

const SubscriptionsTable: FunctionComponent<SubscriptionsTableProps> = ({ cities }) => {
  const countiesList = useSelector((state: RootState) => state.user.counties);
  const citiesList = useSelector((state: RootState) => state.user.cities);
  const fortis = useSelector((state: RootState) => state.fortis);
  const agent = useSelector((state: RootState) => state.agent);
  const [removeCityModalIsOpen, setRemoveCityModalIsOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState<CityType | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!citiesList || citiesList.length === 0) {
      dispatch(getUserCities());
    }
    if (!countiesList || countiesList.length === 0) {
      dispatch(getUserCounties());
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessor: 'name',
      },
      {
        header: 'County',
        accessor: 'countyId',
      },
      {
        header: 'Expires',
        accessor: 'expirationDate',
      },
      {
        header: 'Action',
        accessor: 'action',
      },
    ],
    []
  );

  const data = cities
    .sort((a, b) => {
      if (a.countyId === b.countyId) {
        // sort by city name if in the same county
        return a.name.localeCompare(b.name);
      }
      // group by county id's first, then sort by city name above ^
      return a.countyId - b.countyId;
    })
    .map((city) => {
      return {
        ...city,
        countyId: countiesList && countiesList.find((county) => city.countyId === county.id)?.name,
        expirationDate: city.expirationDate
          ? format(new Date(parseISO(city.expirationDate)), 'MM/dd/yyy')
          : '',
        actions: [
          // if city has an expiration date, hide the Remove button since its already removed
          city.expirationDate
            ? {}
            : {
                label: 'Remove',
                icon: <FaTrash />,
                onClick: () => {
                  setSelectedCity(city);
                  setRemoveCityModalIsOpen(true);
                },
                color: 'dangerOutline',
              },
        ],
      };
    });

  if (cities.length === 0 || countiesList?.length === 0) {
    return <Skeleton count={5} />;
  }

  const newRecurringAmountAfterRemoval = () => {
    if (selectedCity) {
      return (
        cities
          ?.filter((city) => city.expirationDate === null)
          .reduce((acc, curr) => {
            return acc + curr.monthlyPrice;
          }, 0) - selectedCity?.monthlyPrice
      );
    }
    return 0;
  };

  const recurring = fortis.recurring && fortis.recurring[0];

  const removeCitiesFromRecurring = () => {
    if (recurring && selectedCity && agent.cities && agent.cities.length > 0) {
      setRemoveCityModalIsOpen(false);
      setSelectedCity(undefined);

      // Update the Recurring amount, and set an expiration date on the selected city to be removed
      // set to the recurring.next_run_date so a user will have this city until their next billing cycle
      dispatch(
        editFortispayRecurring({
          ...recurring,
          transaction_amount: String(newRecurringAmountAfterRemoval()),
        })
      ).then((response: ActionResponseType) => {
        if (response && !response.error && agent.fortispayContactId != null) {
          dispatch(
            updateAgentProfile({
              ...agent,
              fortispayRecurringAmount: newRecurringAmountAfterRemoval(),
              cities: [
                ...(agent.cities || []),
                {
                  ...selectedCity,
                  expirationDate: formatISO(new Date(parseISO(recurring.next_run_date))),
                },
              ],
            })
          ).then((res: ActionResponseType) => {
            if (res && !res.error) {
              dispatch(
                addAlert({
                  type: 'success',
                  message: 'Successfully updated monthly subscription',
                })
              );
            }
          });
          dispatch(getFortispayAccountvaults({ contact_id: agent.fortispayContactId }));
        }
      });
    }
  };

  return (
    <>
      <Table columns={columns} data={data} hasPagination hasSorting />

      {selectedCity && (
        <Modal toggleModal={() => setRemoveCityModalIsOpen(false)} isOpen={removeCityModalIsOpen}>
          <Heading styledAs="title">Remove {selectedCity?.name}?</Heading>
          <p>
            Are you sure you want to remove {selectedCity?.name}? You will still have access to{' '}
            {selectedCity?.name} listings until your next billing cycle on{' '}
            {format(new Date(parseISO(recurring.next_run_date)), 'MMM do')}.
          </p>
          <p>
            <strong>Note:</strong> If you have previously purchased an entire county, you will lose
            your county discount by removing a city.
          </p>

          <p>
            Your new monthly subscription will be{' '}
            <strong>${numberWithCommas(newRecurringAmountAfterRemoval())}</strong>.
          </p>

          <Row>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => {
                  setRemoveCityModalIsOpen(false);
                  setSelectedCity(undefined);
                }}
                color="primaryOutline"
                block
              >
                Cancel
              </Button>
            </Column>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => removeCitiesFromRecurring()}
                block
                color="danger"
              >
                Remove
              </Button>
            </Column>
          </Row>
        </Modal>
      )}
    </>
  );
};

export default SubscriptionsTable;
