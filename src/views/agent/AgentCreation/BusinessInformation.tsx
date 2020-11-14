import React, { FunctionComponent, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';

import {
  FlexContainer,
  Heading,
  Button,
  Input,
  TimelineProgress,
  Card,
  Seo,
  HorizontalRule,
  LoadingPage,
  Box,
  Column,
  Row,
  Alert,
} from '../../../components';
import { getUserCities, getUserCounties } from '../../../redux/ducks/user';
import { captureAgentSignupData } from '../../../redux/ducks/agent';
import { RootState } from '../../../redux/ducks';
import { CityType } from '../../../redux/ducks/admin.d';
import { logout } from '../../../redux/ducks/auth';
import { brandSuccess } from '../../../styles/color';

type BusinessInformationProps = {} & RouteComponentProps;

const BusinessInformation: FunctionComponent<BusinessInformationProps> = () => {
  const cities = useSelector((state: RootState) => state.user.cities);
  const counties = useSelector((state: RootState) => state.user.counties);
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
    dispatch(
      captureAgentSignupData({
        agentProfileComplete: false,
        cities: [],
      })
    );
    dispatch(logout());
    navigate('/');
  };

  const cityOptions =
    cities &&
    cities.map((city) => {
      const obj = { value: '', label: '' };
      obj.value = city.name;
      obj.label = `${city.name} - $${numberWithCommas(city.monthlyPrice)}/mo`;
      return obj;
    });
  const initialValues = {
    cities: [],
    counties: [],
  };

  const countyOptions =
    counties &&
    counties.map((county) => {
      const obj = { value: '', label: '' };
      obj.value = county.name;
      obj.label = `${county.name} - $${numberWithCommas(county.monthlyPrice)}/mo`;
      return obj;
    });

  const getCitiesTotal = (cityVals: string | string[]) => {
    const selectedCities = cities?.filter((city) => cityVals.includes(city.name));

    return selectedCities?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  const getCountiesTotal = (countyVals: string | string[]) => {
    const selectedCounties = counties?.filter((county) => countyVals.includes(county.name));

    return selectedCounties?.reduce((acc, curr) => {
      return acc + curr.monthlyPrice;
    }, 0);
  };

  return (
    <>
      <Seo title="Business Information" />
      <TimelineProgress
        items={[
          'Create Account',
          'Verify Email',
          'Agent Info',
          'Business Info',
          'Payment',
          'Confirm',
        ]}
        currentStep={4}
      />
      <Card
        fullWidth
        cardTitle="Business Information"
        cardSubtitle="Please select your subscription type"
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
                <Heading as="h3">Pay as you go</Heading>
                <div style={{ flex: 1 }}>
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>Full access to bid on all listings within the RealtyOffer platform</div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>Pay a one-time fee of $295 only when you are awarded a bid</div>
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
                <Heading as="h3">Monthly Subscription</Heading>
                <div style={{ flex: 1 }}>
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>Full access to bid on all listings within the RealtyOffer platform</div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                  <Row>
                    <Column xs={1}>
                      <FaCheck color={brandSuccess} />
                    </Column>
                    <Column xs={11}>
                      <div>
                        For listings in your subscription area, receive unlimited access by paying a
                        monthly subscription fee that ranges from $199 to $995 per city
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
                        For listings outside your subscription area, choose to pay a one-time fee of
                        $295 or add that city to your subscription
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
                        Purchase an entire county for a discount compared to buying multiple cities
                        separately
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
                  <Button type="link" to="/agent/payment-information" block>
                    Continue
                  </Button>
                ) : (
                  <>
                    <p>Select which cities you would like to receive unlimited access to:</p>
                    <Formik
                      validateOnMount
                      initialValues={initialValues}
                      onSubmit={(values, { setSubmitting }) => {
                        const cityDTOs =
                          cities &&
                          values.cities.map(
                            (value: string) =>
                              cities.find((city) => city.name === value) as CityType
                          );
                        dispatch(
                          captureAgentSignupData({
                            cities: cityDTOs,
                            total: Number(getCitiesTotal(values.cities)),
                          })
                        );
                        setSubmitting(false);
                        navigate('/agent/payment-information');
                      }}
                    >
                      {({ isSubmitting, isValid, values, ...rest }) => (
                        <Form>
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
                          {(values.cities.length > 2 || values.counties.length >= 1) && (
                            <>
                              <Alert
                                type="info"
                                message="It may be cheaper to purchase an entire county rather than multiple cities. Select a county or counties below for bulk savings!"
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
                            </>
                          )}

                          <HorizontalRule />
                          <FlexContainer justifyContent="space-between">
                            <Heading as="h5" noMargin>
                              Total:
                            </Heading>
                            <Heading as="h5" noMargin>
                              {values.counties.length >= 1
                                ? `$${numberWithCommas(Number(getCountiesTotal(values.counties)))}`
                                : `$${numberWithCommas(Number(getCitiesTotal(values.cities)))}`}
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
                                  {values.cities.length === 1
                                    ? '1 city'
                                    : `${values.cities.length} cities`}{' '}
                                  selected
                                </>
                              )}
                            </p>
                            <p>per month</p>
                          </FlexContainer>
                          <Button
                            type="submit"
                            color="primary"
                            block
                            disabled={isSubmitting || !isValid}
                            isLoading={isSubmitting || agent.isLoading}
                          >
                            Checkout
                          </Button>
                        </Form>
                      )}
                    </Formik>
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
