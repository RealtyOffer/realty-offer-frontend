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
import { requiredSelect } from '../../../utils/validations';
import UnsavedChangesModal from './UnsavedChangesModal';
import {
  createOptionsFromArray,
  createOptionsFromManagedDropdownList,
} from '../../../utils/createOptionsFromArray';
import { CityType } from '../../../redux/ducks/admin.d';
import { getHomeTypesList } from '../../../redux/ducks/dropdowns';

type BuyingFormValues = {
  buyingCities: Array<string>;
  buyingPriceRange: string;
  freeMortgageConsult: boolean;
  preApproved: boolean;
  buyerTypeOfHomeId: number;
};

type BuyingProps = {} & RouteComponentProps;

const Buying: FunctionComponent<BuyingProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const listing = useSelector((state: RootState) => state.consumer.listing);
  const cities = useSelector((state: RootState) => state.user.cities);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const homeTypesList = useSelector((state: RootState) => state.dropdowns.homeTypes.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCities());
  }, []);

  useEffect(() => {
    if (!homeTypesList || homeTypesList.length === 0) {
      dispatch(getHomeTypesList());
    }
  }, []);

  const initialValues: BuyingFormValues = {
    buyingCities: [],
    buyingPriceRange: '',
    freeMortgageConsult: false,
    preApproved: false,
    buyerTypeOfHomeId: 0,
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const isBuyerAndSeller = listing && listing.type === 'buyerSeller';
  const cityOptions = cities && createOptionsFromArray(cities, 'name');

  return (
    <ClientOnly>
      <Seo title="Buy A Home" />
      <Card
        cardTitle="Tell us about your move"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <ProgressBar
            value={isBuyerAndSeller ? 33 : 50}
            label={`Step 1/${isBuyerAndSeller ? 3 : 2}`}
            name="progress"
          />
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values) => {
              // return array of CityType DTOs
              const cityDTOs =
                cities &&
                values.buyingCities.map(
                  (value) => cities.find((city) => city.name === value) as CityType
                );
              dispatch(
                captureConsumerData({
                  buyingCities: cityDTOs,
                  buyingPriceRangeId: Number(values.buyingPriceRange),
                  freeMortgageConsult: values.freeMortgageConsult,
                  preApproved: values.preApproved,
                  createDateTime: new Date(),
                  buyerTypeOfHomeId: Number(values.buyerTypeOfHomeId),
                })
              );
              navigate(isBuyerAndSeller ? '/consumer/selling' : '/consumer/sign-up');
            }}
          >
            {({ values, isSubmitting, isValid, ...rest }) => (
              <Form>
                <Field
                  as={Input}
                  type="select"
                  isMulti
                  name="buyingCities"
                  options={cityOptions}
                  label="What city/cities are you looking to move to?"
                  validate={requiredSelect}
                  required
                  {...rest}
                />
                <p>
                  <small>
                    City not in our list? No problem at all.{' '}
                    <Link to="/consumer/missing-city/">Connect directly</Link> with a RealtyOffer
                    specialist who can assist with your move.
                  </small>
                </p>
                <Field
                  as={Input}
                  type="select"
                  name="buyingPriceRange"
                  options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                  label="Do you have a purchase price in mind?"
                  validate={requiredSelect}
                  required
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="buyerTypeOfHomeId"
                  label="What is the type of home you are looking for?"
                  validate={requiredSelect}
                  required
                  options={createOptionsFromManagedDropdownList(homeTypesList)}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="checkbox"
                  checked={values.freeMortgageConsult}
                  name="freeMortgageConsult"
                  label="Would you like a free mortgage consultation?"
                />
                <Field
                  as={Input}
                  type="checkbox"
                  checked={values.preApproved}
                  name="preApproved"
                  label="Have you received a mortgage pre-approval?"
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

export default Buying;
