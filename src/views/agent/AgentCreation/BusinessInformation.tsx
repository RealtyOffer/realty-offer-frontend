import React, { FunctionComponent, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

import { RouteComponentProps } from '@reach/router';
import { FaCheck } from 'react-icons/fa';

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
} from '../../../components';
import { requiredField } from '../../../utils/validations';
import { getUserCities } from '../../../redux/ducks/user';
import { captureAgentSignupData } from '../../../redux/ducks/agent';
import { RootState } from '../../../redux/ducks';
import { CityType } from '../../../redux/ducks/admin.d';
import { logout } from '../../../redux/ducks/auth';
import { brandSuccess } from '../../../styles/color';

type BusinessInformationProps = {} & RouteComponentProps;

const BusinessInformation: FunctionComponent<BusinessInformationProps> = () => {
  const cities = useSelector((state: RootState) => state.user.cities);
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
  };

  const getTotal = (cityVals: string | string[]) => {
    const selectedCities = cities?.filter((city) => cityVals.includes(city.name));

    return selectedCities?.reduce((acc, curr) => {
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
            <Box>
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
                <Button type="button" onClick={() => setPricingModel('payAsYouGo')} block>
                  Select
                </Button>
              </FlexContainer>
            </Box>
          </Column>
          <Column md={5}>
            <Box>
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
                      </div>
                    </Column>
                  </Row>
                  <HorizontalRule compact />
                </div>
                <Button type="button" onClick={() => setPricingModel('monthly')} block>
                  Select
                </Button>
              </FlexContainer>
            </Box>
          </Column>
        </Row>
        {cities && cities.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const cityDTOs =
                cities &&
                values.cities.map(
                  (value: string) => cities.find((city) => city.name === value) as CityType
                );
              dispatch(
                captureAgentSignupData({
                  cities: cityDTOs,
                  total: Number(getTotal(values.cities)),
                })
              );
              setSubmitting(false);
              navigate('/agent/payment-information');
            }}
          >
            {({ isSubmitting, isValid, values, ...rest }) => (
              <Form>
                {pricingModel}
                <Field
                  as={Input}
                  type="select"
                  isMulti
                  name="cities"
                  label="Cities"
                  options={cityOptions}
                  validate={requiredField}
                  required
                  {...rest}
                />
                <HorizontalRule />
                <FlexContainer justifyContent="space-between">
                  <Heading as="h5" noMargin>
                    Total:
                  </Heading>
                  <Heading as="h5" noMargin>
                    ${numberWithCommas(Number(getTotal(values.cities)))}
                  </Heading>
                </FlexContainer>
                <FlexContainer justifyContent="space-between">
                  <p>
                    {values.cities.length === 1 ? '1 city' : `${values.cities.length} cities`}{' '}
                    selected
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
        ) : (
          <LoadingPage />
        )}
        <Button type="button" onClick={() => save()} color="text" block>
          Save &amp; Complete Later
        </Button>
      </Card>
    </>
  );
};

export default BusinessInformation;
