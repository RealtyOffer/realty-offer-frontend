/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import { FaInfoCircle } from 'react-icons/fa';

import {
  Alert,
  Button,
  Column,
  FlexContainer,
  Heading,
  HorizontalRule,
  Input,
  LoadingPage,
  Modal,
  Row,
} from '../../../../components';
import { CityType } from '../../../../redux/ducks/admin.d';
import { RootState } from '../../../../redux/ducks';
import numberWithCommas from '../../../../utils/numberWithCommas';
import {
  createFortispayRecurring,
  editFortispayRecurring,
  postSingleFortispayTransaction,
} from '../../../../redux/ducks/fortis';
import { ActionResponseType } from '../../../../redux/constants';
import { updateAgentProfile } from '../../../../redux/ducks/agent';
import { addAlert } from '../../../../redux/ducks/globalAlerts';

type AddNewCityToSubscriptionProps = {
  toggleModal: (state: boolean) => void;
  modalIsOpen: boolean;
};

const AddNewCityToSubscription: FunctionComponent<AddNewCityToSubscriptionProps> = ({
  toggleModal,
  modalIsOpen,
}) => {
  const countiesList = useSelector((state: RootState) => state.user.counties);
  const citiesList = useSelector((state: RootState) => state.user.cities);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const dispatch = useDispatch();

  const cityOptions =
    citiesList &&
    citiesList
      .filter((c) => !agent.cities?.some((agentCity) => agentCity.id === c.id))
      .map((city) => {
        const obj = { value: '', label: '' };
        obj.value = city.name;
        obj.label = `${city.name} - $${numberWithCommas(city.monthlyPrice)}/mo`;
        return obj;
      });

  const countyOptions =
    countiesList &&
    countiesList.map((county) => {
      const obj = { value: '', label: '' };
      obj.value = county.name;
      obj.label = `${county.name} - $${numberWithCommas(county.monthlyPrice)}/mo`;
      return obj;
    });

  const initialValues = {
    cities: [],
    counties: [],
  };

  const getNewCitiesTotal = (cityVals: string | string[]) => {
    const selectedCities = citiesList?.filter((city) => cityVals.includes(city.name));

    return selectedCities?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  const getNewCountiesTotal = (countyVals: string | string[]) => {
    const selectedCounties = countiesList?.filter((county) => countyVals.includes(county.name));

    return selectedCounties?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  const selectedCounties = (values: typeof initialValues) =>
    countiesList &&
    countiesList
      .filter((county) => values.counties.some((c) => c === county.name))
      .map((s) => s.id);

  const citiesByCounty = (values: typeof initialValues) =>
    agent.cities &&
    agent.cities.filter((city) => selectedCounties(values)?.includes(city.countyId));

  const newCityDTOs = (values: typeof initialValues) =>
    citiesList &&
    values.cities.map(
      (value: string) => citiesList.find((city) => city.name === value) as CityType
    );

  const newAddedCities = (values: typeof initialValues) =>
    // if there are counties selected, find all the matching cities. otherwise, return new cities
    citiesByCounty(values) && citiesByCounty(values)?.length > 0
      ? citiesByCounty(values)
      : newCityDTOs(values);

  const totalOfNewCities = (values: typeof initialValues) =>
    values.counties.length >= 1
      ? Number(getNewCountiesTotal(values.counties))
      : Number(getNewCitiesTotal(values.cities));

  const recurring = fortis.recurring && fortis.recurring[0];

  const newRecurringAmountWithNewCities = (values: typeof initialValues) =>
    Number(recurring.transaction_amount) + totalOfNewCities(values);

  const daysBeforeNextBilling =
    recurring && differenceInDays(new Date(parseISO(recurring.next_run_date)), new Date());

  const proratedAmountOfNewCities = (values: typeof initialValues) =>
    (daysBeforeNextBilling / 30) * totalOfNewCities(values);

  return (
    <>
      <Modal toggleModal={() => toggleModal(!modalIsOpen)} isOpen={modalIsOpen}>
        <Heading styledAs="title">Add More Cities</Heading>
        {(citiesList && citiesList.length > 0) || (countiesList && countiesList.length > 0) ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              // pro-rated for rest of billing cycle
              dispatch(
                postSingleFortispayTransaction({
                  transaction_amount: Number(proratedAmountOfNewCities(values).toFixed(2)),
                  account_vault_id: agent.fortispayAccountVaultId as string,
                })
              );

              dispatch(
                fortis.recurring.length > 0
                  ? editFortispayRecurring({
                      ...recurring,
                      transaction_amount: String(newRecurringAmountWithNewCities(values)),
                    })
                  : createFortispayRecurring({
                      account_vault_id: agent.fortispayAccountVaultId as string,
                      transaction_amount: agent.fortispayRecurringAmount?.toString() as string,
                      interval_type: 'm',
                      interval: 1,
                      start_date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                    })
              ).then((response: ActionResponseType) => {
                if (response && !response.error && agent.fortispayContactId != null) {
                  dispatch(
                    updateAgentProfile({
                      ...agent,
                      cities: [...(agent.cities || []), ...(newAddedCities(values) || [])],
                      fortispayRecurringAmount: newRecurringAmountWithNewCities(values),
                    })
                  ).then((res: ActionResponseType) => {
                    if (res && !res.error) {
                      dispatch(
                        addAlert({
                          type: 'success',
                          message: 'Successfully added to monthly subscription',
                        })
                      );
                    }
                  });

                  setSubmitting(false);
                  toggleModal(!modalIsOpen);
                }
              });
            }}
          >
            {({ isSubmitting, isValid, values, ...rest }) => (
              <Form>
                <>
                  <p>Select which new cities you would like to receive unlimited access to:</p>
                  <Field
                    as={Input}
                    type="select"
                    isMulti
                    name="cities"
                    label="Cities"
                    options={cityOptions}
                    required
                    {...rest}
                  />
                </>

                <>
                  <Alert
                    type="info"
                    message="It may be cheaper to purchase an entire county rather than multiple cities. Select a county or counties below for bulk savings."
                  />
                  <Field
                    as={Input}
                    type="select"
                    isMulti
                    name="counties"
                    label="Counties"
                    options={countyOptions}
                    required
                    {...rest}
                  />
                  <p>
                    <small>
                      <FaInfoCircle /> Remove all counties to select cities individually again.
                    </small>
                  </p>
                </>

                <HorizontalRule />
                <FlexContainer justifyContent="space-between">
                  <Heading as="h5" noMargin>
                    Total:
                  </Heading>
                  <Heading as="h5" noMargin>
                    ${numberWithCommas(totalOfNewCities(values))}
                  </Heading>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <p>
                    {values.counties.length >= 1 ? (
                      <>
                        {values.counties.length === 1
                          ? '1 county'
                          : `${values.counties.length} counties`}{' '}
                        selected
                      </>
                    ) : (
                      <>
                        {values.cities.length === 1 ? '1 city' : `${values.cities.length} cities`}{' '}
                        selected
                      </>
                    )}
                  </p>
                  <p>per month</p>
                  <p>
                    This amount will be added to the{' '}
                    {agent.cities && agent.cities.length === 1
                      ? '1 city'
                      : `${agent.cities && agent.cities.length} cities`}{' '}
                    already subscribed to, for a total of{' '}
                    <strong>
                      {`$${numberWithCommas(newRecurringAmountWithNewCities(values))}`}
                    </strong>
                  </p>
                  {recurring && proratedAmountOfNewCities(values) !== 0 && (
                    <p>
                      You will also be charged a pro-rated amount of{' '}
                      <strong>${numberWithCommas(proratedAmountOfNewCities(values))}</strong> for
                      the next {daysBeforeNextBilling} days before your next billing cycle on{' '}
                      {format(new Date(parseISO(recurring.next_run_date)), 'MMM do')}.
                    </p>
                  )}
                </FlexContainer>
                <Row>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => toggleModal(!modalIsOpen)}
                      color="primaryOutline"
                      block
                    >
                      Cancel
                    </Button>
                  </Column>
                  <Column xs={6}>
                    <Button
                      type="submit"
                      color="primary"
                      block
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        Number(getNewCountiesTotal(values.counties) ?? 0) +
                          (Number(getNewCitiesTotal(values.cities)) ?? 0) ===
                          0
                      }
                      isLoading={isSubmitting || agent.isLoading}
                    >
                      Add
                    </Button>
                  </Column>
                </Row>
              </Form>
            )}
          </Formik>
        ) : (
          <LoadingPage />
        )}
      </Modal>
    </>
  );
};

export default AddNewCityToSubscription;
