import React, { useEffect, FunctionComponent, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Card,
  Input,
  Seo,
  Column,
  Row,
  HorizontalRule,
  ProgressBar,
} from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';
import { getUserCities } from '../../../redux/ducks/user';
import { RootState } from '../../../redux/ducks';

import { requiredField, requiredSelect } from '../../../utils/validations';
import priceRangesList from '../../../utils/priceRangesList';
import UnsavedChangesModal from './UnsavedChangesModal';
import createOptionsFromArray from '../../../utils/createOptionsFromArray';
import { CityType } from '../../../redux/ducks/admin.d';

type SellingFormValues = {
  sellersAddressLine1: string;
  sellersAddressLine2: string;
  sellersCity: string;

  sellersZip: string;
  sellersTimeline: string;
  sellersListingPriceInMind: string;
  sellersMortgageBalance: string;
};

const howSoonOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-12 months', label: '6-12 months' },
];

type SellingProps = {} & RouteComponentProps;

const Selling: FunctionComponent<SellingProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const signupData = useSelector((state: RootState) => state.consumer.signupData);
  const cities = useSelector((state: RootState) => state.user.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCities());
  }, []);

  const initialValues: SellingFormValues = {
    sellersAddressLine1: '',
    sellersAddressLine2: '',
    sellersCity: '',
    sellersZip: '',
    sellersTimeline: '',
    sellersListingPriceInMind: '',
    sellersMortgageBalance: '',
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const isBuyerAndSeller = signupData.consumerType === 'buyerSeller';
  const cityOptions = cities && createOptionsFromArray(cities, 'name');

  return (
    <>
      <Seo title="Sell Your Home" />
      <Card
        cardTitle="Tell us about your move"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <ProgressBar
            value={isBuyerAndSeller ? 50 : 33}
            label={`Step ${isBuyerAndSeller ? 2 : 1}/${isBuyerAndSeller ? 4 : 3}`}
            name="progress"
          />
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values) => {
              // return array of CityType DTOs
              const cityDTO =
                cities && (cities.find((city) => city.name === values.sellersCity) as CityType);
              dispatch(
                captureConsumerData({
                  ...values,
                  sellersCity: cityDTO,
                })
              );
              navigate('/consumer/special-requests');
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
                />
                <Field as={Input} type="text" name="sellersAddressLine2" label="Address Line 2" />

                <Row>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="select"
                      name="sellersCity"
                      options={cityOptions}
                      label="City"
                      validate={requiredSelect}
                      {...rest}
                    />
                  </Column>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellersZip"
                      label="Zip Code"
                      validate={requiredField}
                    />
                  </Column>
                </Row>
                <Field
                  as={Input}
                  type="select"
                  name="sellersTimeline"
                  label="How soon are you looking to sell your home?"
                  validate={requiredField}
                  options={howSoonOptions}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersListingPriceInMind"
                  label="Do you have a listing price in mind?"
                  validate={requiredField}
                  options={priceRangesList}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersMortgageBalance"
                  label="What is the estimated mortgage balance?"
                  validate={requiredField}
                  options={[
                    { value: 'Not sure', label: 'Not sure' },
                    {
                      value: 'Less than $100,000',
                      label: 'Less than $100,000',
                    },
                    ...priceRangesList,
                  ]}
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
                      Back
                    </Button>
                  </Column>
                  <Column xs={6}>
                    <Button
                      type="submit"
                      block
                      iconRight={<FaCaretRight />}
                      disabled={isSubmitting || !isValid}
                    >
                      Next
                    </Button>
                  </Column>
                </Row>
              </Form>
            )}
          </Formik>
        </>
      </Card>
      <UnsavedChangesModal modalIsOpen={modalIsOpen} toggleModal={toggleUnsavedChangesModal} />
    </>
  );
};

export default Selling;
