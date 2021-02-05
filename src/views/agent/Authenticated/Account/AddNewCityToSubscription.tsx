/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { Formik, Form, Field } from 'formik';
import { flatten, isEmpty, omit } from 'lodash';

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

  const cityOptions = (selectedCounty: number) => {
    return (
      citiesList &&
      citiesList
        // filter out cities the agent already has subscribed to
        .filter(
          (c) =>
            !agent.cities?.some((agentCity) => agentCity.id === c.id) &&
            selectedCounty === c.countyId
        )
        .map((city) => {
          const obj = { value: '', label: '' };
          obj.value = city.name;
          obj.label = `${city.name} - $${numberWithCommas(city.monthlyPrice)}/mo`;
          return obj;
        })
    );
  };

  const countyOptions =
    countiesList &&
    countiesList.map((county) => {
      const obj = { value: 0, label: '' };
      obj.value = county.id;
      obj.label = county.name;
      return obj;
    });

  const countyInitialVals = countiesList
    ?.map((c) => c.name)
    // eslint-disable-next-line no-sequences
    .reduce((a: any, b: any) => ((a[b] = []), a), {});

  const initialValues = {
    counties: [],
    ...countyInitialVals,
  } as {
    [key: string]: [];
  };

  const flattenedValues = (values: typeof initialValues) => {
    if (isEmpty(values) || typeof values === 'undefined' || values === null) {
      return [];
    }

    const cityValuesOnly = omit(values, 'counties');

    // returns an array of city names and "all 'county'" strings from values
    return flatten(Object.keys(cityValuesOnly).map((county) => values[county]));
  };

  const selectedCities = (values: typeof initialValues) => {
    // first, get an array of strings from values
    const selectedCitiesAndCounties = flattenedValues(values);

    // now, find those cities in citiesList and return an array of full city DTO with name and price
    // county names will be ignored because they wont be in citiesList
    return citiesList?.filter((city) => selectedCitiesAndCounties.includes(city.name as never));
  };

  // total of new cities that are added individually, not any cities from an "all citys in county" selection
  const getNewCitiesTotal = (values: typeof initialValues) =>
    selectedCities(values)?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);

  // returns the county DTOs that have been selected by a "all cities in county" selection
  const selectedCounties = (values: typeof initialValues) => {
    // first, get an array of strings from values
    const selectedCitiesAndCounties = flattenedValues(values);

    // now, remove any cities and only return an array of values that start with the string "all "
    // then map over to remove the "all "
    const countyValuesOnly = selectedCitiesAndCounties
      .filter((val: string) => val.includes('all '))
      .map((name: string) => name.substring(4));

    // find the counties from the counties list
    return countiesList?.filter((county) => countyValuesOnly.includes(county.name));
  };

  // Cost of the any selections of "all cities in county" selections
  const getNewCountiesTotal = (values: typeof initialValues) =>
    selectedCounties(values)?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);

  // Used for updating the Agent's cities in database
  const allNewCitiesToBeAdded = (values: typeof initialValues) => {
    // if a "all cities in county" was selected, grab all of those cities here
    const citiesFromCounties = citiesList?.filter((city) =>
      selectedCounties(values)?.some((county) => city.countyId === county.id)
    );

    // combine any of the individually selected cities plus any cities from "all cities in county" selection
    return [...(selectedCities(values) || []), ...(citiesFromCounties || [])];
  };

  // new total of just additions, so only new cities and new "all county" selections
  const newTotal = (values: typeof initialValues) =>
    Number(getNewCitiesTotal(values)) + Number(getNewCountiesTotal(values));

  // if there are multiple recurrings in fortis for some reason, lets just work on the first one
  const recurring = fortis.recurring && fortis.recurring[0];

  // if a user has subscribed to cities and then selects an "all cities in county", this will
  // return an array of those cities already subscribed to for JUST "all cities in county" selections
  const existingAgentCitiesInAllCountySelection = (values: typeof initialValues) =>
    agent.cities?.filter((city) =>
      selectedCounties(values)?.some((county) => county.id === city.countyId)
    );

  // using the existing recurring amount, subtract any cities that were already subscribed to,
  // and then add the new total of newly added cities and "all counties"
  const existingRecurringAmountPlusNewTotal = (values: typeof initialValues) => {
    // add up the agent's existing cities from a "all cities in county" selection so we can subtract
    const cityCostsToBeRemovedWithAllCountySelection = existingAgentCitiesInAllCountySelection(
      values
    )?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);

    return (
      Number(
        Number(recurring.transaction_amount) - (cityCostsToBeRemovedWithAllCountySelection || 0)
      ) + newTotal(values)
    );
  };

  const daysBeforeNextBilling =
    recurring && differenceInDays(new Date(parseISO(recurring.next_run_date)), new Date());

  // one time pro-rated fee of just the new total of added cities/counties
  const proratedAmountOfNewTotal = (values: typeof initialValues) =>
    (daysBeforeNextBilling / 30) * newTotal(values);

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
                  transaction_amount: Number(proratedAmountOfNewTotal(values).toFixed(2)),
                  account_vault_id: agent.fortispayAccountVaultId as string,
                })
              );

              dispatch(
                fortis.recurring.length > 0
                  ? editFortispayRecurring({
                      ...recurring,
                      transaction_amount: String(existingRecurringAmountPlusNewTotal(values)),
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
                      cities: [...(agent.cities || []), ...(allNewCitiesToBeAdded(values) || [])],
                      fortispayRecurringAmount: existingRecurringAmountPlusNewTotal(values),
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
            {({ isSubmitting, isValid, values, errors, ...rest }) => (
              <Form>
                {/* minHeight ensures county dropdown has enough height to not get cut off */}
                <div style={{ minHeight: 300 }}>
                  <Field
                    as={Input}
                    type="select"
                    isMulti
                    name="counties"
                    label="Select which counties you work in"
                    options={countyOptions}
                    required
                    {...rest}
                  />

                  {values.counties.length > 0 &&
                    values.counties.map((county) => {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      const matchingCounty = countiesList?.find((c) => c.id === county)!;
                      const allCountyString = `all ${matchingCounty.name}`;
                      return (
                        <Field
                          key={county}
                          as={Input}
                          validate={() => {
                            if (
                              values[matchingCounty.name] &&
                              values[matchingCounty.name].length > 1 &&
                              values[matchingCounty.name].indexOf(allCountyString as never) > -1
                            ) {
                              return 'All Cities option is selected, please remove individual cities.';
                            }
                            return undefined;
                          }}
                          type="select"
                          name={matchingCounty.name}
                          label={`Select ${matchingCounty.name} cities`}
                          isMulti
                          options={
                            cityOptions(county)?.length === 0
                              ? []
                              : [
                                  {
                                    value: `all ${matchingCounty.name}`,
                                    label: `All Cities in ${
                                      matchingCounty.name
                                    } County - $${numberWithCommas(
                                      matchingCounty.monthlyPrice
                                    )}/mo`,
                                  },
                                  ...(cityOptions(county) as Array<{
                                    value: string;
                                    label: string;
                                  }>),
                                ]
                          }
                          required
                          {...rest}
                        />
                      );
                    })}
                </div>
                <HorizontalRule />
                {!isEmpty(errors) && (
                  <Alert type="danger" message="Fix the error above to see the new total" />
                )}
                <FlexContainer justifyContent="space-between">
                  <Heading as="h5" noMargin>
                    Total:
                  </Heading>
                  <Heading as="h5" noMargin>
                    {!isEmpty(errors) ? (
                      <span>--</span>
                    ) : (
                      <>${numberWithCommas(newTotal(values))}</>
                    )}
                  </Heading>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <p>&nbsp;</p>
                  <p>per month</p>
                </FlexContainer>

                {isEmpty(errors) && newTotal(values) !== 0 && (
                  <p>
                    This amount will be added to the{' '}
                    {agent.cities && agent.cities.length === 1
                      ? '1 city'
                      : `${agent.cities && agent.cities.length} cities`}{' '}
                    already subscribed to, for a total of{' '}
                    <strong>{`$${numberWithCommas(
                      existingRecurringAmountPlusNewTotal(values)
                    )}`}</strong>
                    .{' '}
                    {existingAgentCitiesInAllCountySelection(values).length > 0 && (
                      <span>
                        Cities you have already subscribed to will be updated to include the
                        discount by subscribing to an entire county.
                      </span>
                    )}
                  </p>
                )}
                {recurring && proratedAmountOfNewTotal(values) !== 0 && isEmpty(errors) && (
                  <p>
                    You will also be charged a pro-rated amount of{' '}
                    <strong>${numberWithCommas(proratedAmountOfNewTotal(values))}</strong> for the
                    next {daysBeforeNextBilling} days before your next billing cycle on{' '}
                    {format(new Date(parseISO(recurring.next_run_date)), 'MMM do')}.
                  </p>
                )}
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
                        !isEmpty(errors) ||
                        allNewCitiesToBeAdded(values).length === 0
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
