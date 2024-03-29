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
  ClientOnly,
  TimelineProgress,
  LoadingPage,
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
import { getHomeTypesList, getPriceRangesList } from '../../../redux/ducks/dropdowns';

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
    dispatch(getPriceRangesList());
    dispatch(getHomeTypesList());
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
      <Seo
        title="Buying a home? - Connect with Real Estate Agents in Michigan"
        description="Buy a home fast and with lower fees. Within 24 hours, multiple real estate agents will offer part of their commission so that you will bring les money to the closing table"
        meta={[{ name: 'keywords', content: 'buying a home' }]}
      />
      <TimelineProgress
        items={['Get Started', 'Create Listing', 'Create Account', 'Verify Email']}
        currentStep={2}
      />
      <Card
        cardTitle="Buy a Home"
        cardSubtitle="Let us know about where you are planning to move, and how much you are looking to spend."
      >
        {priceRangesList.length > 0 && homeTypesList.length > 0 ? (
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
                    <a href="/consumer/missing-city/" target="_blank">
                      Connect directly
                    </a>{' '}
                    with a RealtyOffer specialist who can assist with your move.
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
                  type="toggle"
                  checked={values.freeMortgageConsult}
                  name="freeMortgageConsult"
                  label="Would you like a free mortgage consultation?"
                />
                <Field
                  as={Input}
                  type="toggle"
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

export default Buying;
