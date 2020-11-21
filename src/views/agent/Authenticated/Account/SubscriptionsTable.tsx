/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { format, parseISO } from 'date-fns';

import { Button, Column, Heading, Modal, Row, Table } from '../../../../components';
import { CityType } from '../../../../redux/ducks/admin.d';
import { RootState } from '../../../../redux/ducks';
import numberWithCommas from '../../../../utils/numberWithCommas';
import { editFortispayRecurring, getFortispayAccountvaults } from '../../../../redux/ducks/fortis';
import { ActionResponseType } from '../../../../redux/constants';
import { updateAgentProfile } from '../../../../redux/ducks/agent';
import { addAlert } from '../../../../redux/ducks/globalAlerts';

type SubscriptionsTableProps = {
  cities: Array<CityType>;
};

const SubscriptionsTable: FunctionComponent<SubscriptionsTableProps> = ({ cities }) => {
  const counties = useSelector((state: RootState) => state.user.counties);
  const fortis = useSelector((state: RootState) => state.fortis);
  const agent = useSelector((state: RootState) => state.agent);
  const [removeCityModalIsOpen, setRemoveCityModalIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityType | undefined>(undefined);
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        header: 'County',
        accessor: 'countyId',
      },
      {
        header: 'Monthly Price',
        accessor: 'monthlyPrice',
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
        countyId: counties && counties.find((county) => city.countyId === county.id)?.name,
        monthlyPrice: `$${numberWithCommas(city.monthlyPrice)}`,
        actions: [
          {
            label: 'Remove',
            onClick: () => {
              setSelectedCity(city);
              setRemoveCityModalIsOpen(true);
            },
            color: 'dangerOutline',
          },
        ],
      };
    });

  if (cities.length === 0 || counties?.length === 0) {
    return <Skeleton count={5} />;
  }

  const getCitiesTotal = () => {
    return cities?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  const newRecurringAmount = () => {
    if (selectedCity) {
      return getCitiesTotal() - selectedCity?.monthlyPrice;
    }
    return 0;
  };

  const recurring = fortis.recurring && fortis.recurring[0];

  const updateRecurringAmount = () => {
    if (recurring && selectedCity && agent.cities && agent.cities.length > 0) {
      setRemoveCityModalIsOpen(false);
      setSelectedCity(undefined);
      dispatch(
        editFortispayRecurring({ ...recurring, transaction_amount: String(newRecurringAmount()) })
      ).then((response: ActionResponseType) => {
        if (response && !response.error && agent.fortispayContactId != null) {
          dispatch(
            updateAgentProfile({
              ...agent,
              fortispayRecurringAmount: newRecurringAmount(),
              // TODO: keep city, but add expiration date to selected city
              cities: agent.cities?.filter((city) => city.id !== selectedCity.id),
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
            <strong>${numberWithCommas(newRecurringAmount())}</strong>.
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
              <Button type="button" onClick={() => updateRecurringAmount()} block color="danger">
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
