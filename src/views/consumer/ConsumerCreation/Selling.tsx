import React, { useEffect, FunctionComponent, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { Link, navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Card,
  Input,
  Seo,
  Column,
  Row,
  HorizontalRule,
  TimelineProgress,
  ClientOnly,
  LoadingPage,
} from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';
import { getUserCities } from '../../../redux/ducks/user';
import { RootState } from '../../../redux/ducks';

import { requiredField, requiredSelect } from '../../../utils/validations';
import UnsavedChangesModal from './UnsavedChangesModal';
import {
  createOptionsFromArray,
  createOptionsFromManagedDropdownList,
} from '../../../utils/createOptionsFromArray';
import { CityType } from '../../../redux/ducks/admin.d';
import { getHomeTypesList, getPriceRangesList } from '../../../redux/ducks/dropdowns';

type SellingFormValues = {
  sellersAddressLine1: string;
  sellersAddressLine2: string;
  sellersCity: string;
  sellersZip: string;
  sellersTimeline: string;
  sellersListingPriceInMind: string;
  sellersMortgageBalance: string;
  sellerTypeOfHomeId: number;
};

const howSoonOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-12 months', label: '6-12 months' },
];

type SellingProps = {} & RouteComponentProps;

const Selling: FunctionComponent<SellingProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const cities = useSelector((state: RootState) => state.user.cities);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const homeTypesList = useSelector((state: RootState) => state.dropdowns.homeTypes.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCities());
    dispatch(getHomeTypesList());
    dispatch(getPriceRangesList());
  }, []);

  const initialValues: SellingFormValues = {
    sellersAddressLine1: '',
    sellersAddressLine2: '',
    sellersCity: '',
    sellersZip: '', // not used currently, just initialize as empty string
    sellersTimeline: '',
    sellersListingPriceInMind: '',
    sellersMortgageBalance: '',
    sellerTypeOfHomeId: 0,
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const cityOptions = cities && createOptionsFromArray(cities, 'name');

  return (
    <ClientOnly>
      <Seo
        title="Sell My Home"
        description="Within 24 hours, top-rated certified and vetted agents in your area will simply offer to charge less commission to win your business!"
      />
      <TimelineProgress
        items={['Get Started', 'Create Listing', 'Create Account', 'Verify Email']}
        currentStep={2}
      />
      <Card
        cardTitle="Sell My Home"
        cardSubtitle="Tell us more about the home you are looking to sell."
      >
        {cities && cities.length > 0 && priceRangesList.length > 0 && homeTypesList.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values) => {
              // return array of CityType DTOs
              const cityDTO =
                cities && (cities.find((city) => city.name === values.sellersCity) as CityType);
              dispatch(
                captureConsumerData({
                  createDateTime: new Date(),
                  sellersAddressLine1: values.sellersAddressLine1,
                  sellersAddressLine2: values.sellersAddressLine2,
                  sellersCity: cityDTO,
                  sellersZip: '',
                  sellersTimeline: values.sellersTimeline,
                  sellersListingPriceInMindPriceRangeInMindId: Number(
                    values.sellersListingPriceInMind
                  ),
                  sellersMortgageBalanceId: Number(values.sellersMortgageBalance),
                  sellerTypeOfHomeId: Number(values.sellerTypeOfHomeId),
                })
              );
              navigate('/consumer/sign-up');
            }}
          >
            {({ isSubmitting, isValid, ...rest }) => (
              <Form>
                <Field
                  as={Input}
                  type="text"
                  name="sellersAddressLine1"
                  label="Address Line 1"
                  validate={requiredField}
                  required
                />
                <Field as={Input} type="text" name="sellersAddressLine2" label="Address Line 2" />
                <Field
                  as={Input}
                  type="select"
                  name="sellersCity"
                  options={cityOptions}
                  label="City"
                  validate={requiredSelect}
                  required
                  {...rest}
                />

                <p>
                  <small>
                    City not in our list? No problem at all.{' '}
                    <a href="/consumer/missing-city/" target="_blank">
                      Connect directly
                    </a>{' '}
                    with a RealtyOffer specialist who can assist with your move.
                  </small>
                </p>

                <Field
                  as={Input}
                  type="select"
                  name="sellersTimeline"
                  label="How soon are you looking to sell your home?"
                  validate={requiredSelect}
                  required
                  options={howSoonOptions}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersListingPriceInMind"
                  label="Do you have a listing price in mind?"
                  validate={requiredSelect}
                  required
                  options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersMortgageBalance"
                  label="What is the estimated mortgage balance?"
                  validate={requiredSelect}
                  required
                  options={createOptionsFromManagedDropdownList(priceRangesList)}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellerTypeOfHomeId"
                  label="What is the type of home?"
                  validate={requiredSelect}
                  required
                  options={createOptionsFromManagedDropdownList(homeTypesList)}
                  {...rest}
                />
                <HorizontalRule />
                <Row>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => toggleUnsavedChangesModal()}
                      block
                      color="primaryOutline"
                      iconLeft={<FaCaretLeft />}
                    >
                      Cancel
                    </Button>
                  </Column>
                  <Column xs={6}>
                    <Button
                      type="submit"
                      block
                      iconRight={<FaCaretRight />}
                      disabled={isSubmitting || !isValid}
                      isLoading={isSubmitting}
                    >
                      Next
                    </Button>
                  </Column>
                </Row>
              </Form>
            )}
          </Formik>
        ) : (
          <LoadingPage />
        )}
      </Card>
      <UnsavedChangesModal modalIsOpen={modalIsOpen} toggleModal={toggleUnsavedChangesModal} />
    </ClientOnly>
  );
};

export default Selling;
