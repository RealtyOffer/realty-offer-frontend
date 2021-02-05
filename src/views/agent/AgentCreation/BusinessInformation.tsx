/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
import { flatten, isEmpty, omit } from 'lodash';

import {
  FlexContainer,
  Heading,
  Button,
  Input,
  TimelineProgress,
  Card,
  Seo,
  HorizontalRule,
  Box,
  Column,
  Row,
  Alert,
  LoadingPage,
} from '../../../components';
import { getUserCities, getUserCounties } from '../../../redux/ducks/user';
import { captureAgentSignupData, updateAgentProfile } from '../../../redux/ducks/agent';
import { RootState } from '../../../redux/ducks';
import { logout } from '../../../redux/ducks/auth';
import { brandSuccess } from '../../../styles/color';

type BusinessInformationProps = {} & RouteComponentProps;

const BusinessInformation: FunctionComponent<BusinessInformationProps> = () => {
  const countiesList = useSelector((state: RootState) => state.user.counties);
  const citiesList = useSelector((state: RootState) => state.user.cities);
  const agent = useSelector((state: RootState) => state.agent);
  const dispatch = useDispatch();
  const [pricingModel, setPricingModel] = useState<'payAsYouGo' | 'monthly' | null>(null);

  const numberWithCommas = (x: number) => {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  useEffect(() => {
    dispatch(getUserCities());
    dispatch(getUserCounties());
  }, []);

  const save = () => {
    dispatch(logout());
    if (window && window.analytics) {
      window.analytics.track('Logout', {
        location: 'Business Information',
      });
    }
    navigate('/');
  };

  const cityOptions = (county: number) => {
    return (
      citiesList &&
      citiesList
        ?.filter((c) => county === c.countyId)
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

  return (
    <>
      <Seo title="Business Information" />
      <TimelineProgress
        items={[
          'Create Account',
          'Verify Email',
          'Agent Info',
          'Business Info',
          'Payment Info',
          'Confirm',
        ]}
        currentStep={4}
      />
      <Card
        fullWidth
        cardTitle="Congratulations! You are on your way to becoming a RealtyOffer Partner. "
        cardSubtitle="Please select your subscription type:"
      >
        <Row>
          <Column md={5} mdOffset={1}>
            <Box
              style={{
                border:
                  pricingModel && pricingModel === 'payAsYouGo'
                    ? `4px solid ${brandSuccess}`
                    : 'none',
              }}
            >
              <FlexContainer flexDirection="column" height="100%">
                <Heading as="h3">Simply pay as you go&hellip;</Heading>
                <p>(cost may vary from area to area)</p>
                <div style={{ flex: 1 }}>
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>
                        Receive unlimited access in the areas of your choosing within the
                        RealtyOffer platform.
                      </div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>
                        Once awarded a bid, pay a <strong>one-time</strong> fee of $295 or instantly
                        subscribe to that city or county for unlimited future bids.
                      </div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                </div>
                <Button
                  type="button"
                  onClick={() => setPricingModel('payAsYouGo')}
                  block
                  color={pricingModel === 'payAsYouGo' ? 'success' : 'successOutline'}
                  iconLeft={pricingModel === 'payAsYouGo' ? <FaCheckCircle /> : null}
                >
                  {pricingModel === 'payAsYouGo' ? 'Selected' : 'Select'}
                </Button>
              </FlexContainer>
            </Box>
          </Column>
          <Column md={5}>
            <Box
              style={{
                border:
                  pricingModel && pricingModel === 'monthly' ? `4px solid ${brandSuccess}` : 'none',
              }}
            >
              <FlexContainer flexDirection="column" height="100%">
                <Heading as="h3">Monthly Subscription&hellip;</Heading>
                <p>(cost may vary from area to area)</p>
                <div style={{ flex: 1 }}>
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>
                        Subscribe to your City or County and receive unlimited access to bid on all
                        listings within the RealtyOffer platform. Once a bid is awarded, you will be
                        able to connect with your new client instantly.
                      </div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>
                        Choose to receive listings outside your subscription area, once a bid is
                        awarded – you will have the option of paying a <strong>one-time</strong>{' '}
                        $295 fee or instantly subscribe to that City or County to receive unlimited
                        bids. This gives you the ability to explore different areas outside your
                        current market.
                      </div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                </div>
                <Button
                  type="button"
                  onClick={() => setPricingModel('monthly')}
                  block
                  color={pricingModel === 'monthly' ? 'success' : 'successOutline'}
                  iconLeft={pricingModel === 'monthly' ? <FaCheckCircle /> : null}
                >
                  {pricingModel === 'monthly' ? 'Selected' : 'Select'}
                </Button>
              </FlexContainer>
            </Box>
          </Column>
        </Row>

        {pricingModel && (
          <>
            <Heading as="h4" styledAs="sectionHeading">
              You have selected the <br />
              {pricingModel === 'payAsYouGo' ? 'Pay As You Go' : 'Monthly Subscription'} option.
            </Heading>
            <Row>
              <Column md={8} mdOffset={2}>
                {pricingModel === 'payAsYouGo' ? (
                  <Button
                    type="button"
                    onClick={() => {
                      dispatch(
                        captureAgentSignupData({
                          cities: [],
                          total: undefined,
                        })
                      );
                      navigate('/agent/payment-information');
                    }}
                    block
                  >
                    Continue
                  </Button>
                ) : (
                  <>
                    {(citiesList && citiesList.length > 0) ||
                    (countiesList && countiesList.length > 0) ? (
                      <Formik
                        validateOnMount
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                          dispatch(
                            captureAgentSignupData({
                              cities: [...(allNewCitiesToBeAdded(values) || [])],
                              total: newTotal(values),
                            })
                          );
                          dispatch(
                            updateAgentProfile({
                              ...agent,
                              cities: [...(allNewCitiesToBeAdded(values) || [])],
                              fortispayRecurringAmount: newTotal(values),
                            })
                          );
                          setSubmitting(false);
                          navigate('/agent/payment-information');
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
                                  const matchingCounty = countiesList?.find(
                                    (c) => c.id === county
                                  )!;
                                  const allCountyString = `all ${matchingCounty.name}`;
                                  return (
                                    <Field
                                      key={county}
                                      as={Input}
                                      validate={() => {
                                        if (
                                          values[matchingCounty.name] &&
                                          values[matchingCounty.name].length > 1 &&
                                          values[matchingCounty.name].indexOf(
                                            allCountyString as never
                                          ) > -1
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
                              <Alert
                                type="danger"
                                message="Fix the error above to see the new total"
                              />
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
                              Continue
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <LoadingPage />
                    )}
                  </>
                )}
              </Column>
            </Row>
          </>
        )}

        <Button type="button" onClick={() => save()} color="text" block>
          Save &amp; Complete Later
        </Button>
      </Card>
    </>
  );
};

export default BusinessInformation;
