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
  ProgressBar,
  ClientOnly,
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
import { getHomeTypesList } from '../../../redux/ducks/dropdowns';

type SellingFormValues = {
  sellersAddressLine1: string;
  sellersAddressLine2: string;
  sellersCity: string;
  sellersZip: string;
  sellersTimeline: string;
  sellersListingPriceInMind: string;
  sellersMortgageBalance: string;
  typeOfHomeId: number;
};

const howSoonOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-12 months', label: '6-12 months' },
];

type SellingProps = {} & RouteComponentProps;

const Selling: FunctionComponent<SellingProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const listing = useSelector((state: RootState) => state.consumer.listing);
  const cities = useSelector((state: RootState) => state.user.cities);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const homeTypesList = useSelector((state: RootState) => state.dropdowns.homeTypes.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cities || cities.length === 0) {
      dispatch(getUserCities());
    }
  }, []);

  useEffect(() => {
    if (!homeTypesList || homeTypesList.length === 0) {
      dispatch(getHomeTypesList());
    }
  }, []);

  const initialValues: SellingFormValues = {
    sellersAddressLine1: '',
    sellersAddressLine2: '',
    sellersCity: '',
    sellersZip: '', // not used currently, just initialize as empty string
    sellersTimeline: '',
    sellersListingPriceInMind: '',
    sellersMortgageBalance: '',
    typeOfHomeId: 0,
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const isBuyerAndSeller = listing && listing.type === 'buyerSeller';
  const cityOptions = cities && createOptionsFromArray(cities, 'name');

  return (
    <ClientOnly>
      <Seo title="Sell Your Home" />
      <Card
        cardTitle="Tell us about your move"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <ProgressBar
            value={isBuyerAndSeller ? 33 : 50}
            label={`Step ${isBuyerAndSeller ? 2 : 1}/${isBuyerAndSeller ? 3 : 2}`}
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
                  typeOfHomeId: Number(values.typeOfHomeId),
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
                {!isBuyerAndSeller && (
                  <p>
                    <small>
                      City not in our list? No problem at all.{' '}
                      <Link to="/consumer/missing-city/">Connect directly</Link> with a RealtyOffer
                      specialist who can assist with your move.
                    </small>
                  </p>
                )}
                <Field
                  as={Input}
                  type="select"
                  name="sellersTimeline"
                  label="How soon are you looking to sell your home?"
                  validate={requiredField}
                  required
                  options={howSoonOptions}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersListingPriceInMind"
                  label="Do you have a listing price in mind?"
                  validate={requiredField}
                  required
                  options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersMortgageBalance"
                  label="What is the estimated mortgage balance?"
                  validate={requiredField}
                  required
                  options={createOptionsFromManagedDropdownList(priceRangesList)}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="typeOfHomeId"
                  label="What is the type of home?"
                  validate={requiredField}
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
    </ClientOnly>
  );
};

export default Selling;
