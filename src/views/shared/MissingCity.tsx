import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';
import { RouteComponentProps } from '@reach/router';

import {
  PageContainer,
  Button,
  Card,
  Input,
  HorizontalRule,
  Seo,
  Heading,
  Column,
  Row,
} from '../../components';

import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredSelect,
} from '../../utils/validations';
import { addAlert } from '../../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../../utils/postFormUrlEncoded';
import { RootState } from '../../redux/ducks';
import { createOptionsFromManagedDropdownList } from '../../utils/createOptionsFromArray';
import { getDropdownListText } from '../../utils/dropdownUtils';
import { getPriceRangesList, getStatesList } from '../../redux/ducks/dropdowns';

type MissingCityFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  subject: string;
  // Buyer only
  buyingCities?: string;
  buyingPriceRange?: string;
  // Seller only
  sellersAddressLine1?: string;
  sellersAddressLine2?: string;
  sellersCity?: string;
  sellersListingPriceInMind?: string;
};

type Props = {};

const MissingCity: FunctionComponent<Props & RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const consumer = useSelector((state: RootState) => state.consumer);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);
  useEffect(() => {
    if (priceRangesList.length === 0) {
      dispatch(getPriceRangesList());
    }
  }, []);

  const formName = 'missing-city';
  const isBuyer = consumer?.listing?.type?.toLowerCase().includes('buyer');
  const isSeller = consumer?.listing?.type?.toLowerCase().includes('seller');
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    state: '',
    zip: '',
    // Buyer only
    buyingCities: '',
    buyingPriceRange: '',
    // Seller only
    sellersAddressLine1: '',
    sellersAddressLine2: '',
    sellersCity: '',
    sellersListingPriceInMind: '',
  };

  return (
    <PageContainer>
      <Seo title="Missing City" />
      <Card cardTitle="Missing City">
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const {
              buyingCities,
              buyingPriceRange,
              sellersAddressLine1,
              sellersAddressLine2,
              sellersCity,
              sellersListingPriceInMind,
              ...rest
            } = values;

            let postingValues: MissingCityFormValues = {
              subject: `Missing City Request: ${values.firstName} ${values.lastName}`,
              ...rest,
            };

            if (isBuyer) {
              postingValues = {
                ...postingValues,
                buyingCities,
                buyingPriceRange: getDropdownListText(priceRangesList, buyingPriceRange),
              };
            }

            if (isSeller) {
              postingValues = {
                ...postingValues,
                sellersAddressLine1,
                sellersAddressLine2,
                sellersCity,
                sellersListingPriceInMind: getDropdownListText(
                  priceRangesList,
                  sellersListingPriceInMind
                ),
              };
            }

            return postFormUrlEncoded(formName, postingValues)
              .then(() => {
                resetForm();
                dispatch(
                  addAlert({
                    message: 'Thanks for your message. We will be in touch shortly!',
                    type: 'success',
                  })
                );
                if (window && window.analytics) {
                  window.analytics.track(`Missing City Form completed`, {
                    ...postingValues,
                  });
                }
              })
              .catch(() => {
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again.',
                    type: 'danger',
                  })
                );
                if (window && window.analytics) {
                  window.analytics.track(`Missing City Form failure`, {
                    ...postingValues,
                  });
                }
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting, isValid, setFieldValue, ...rest }) => (
            <Form
              name="missing-city"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
              onBlur={() =>
                setFieldValue(
                  'subject',
                  `Missing City Request: ${values.firstName} ${values.lastName}`
                )
              }
            >
              <input type="hidden" name="form-name" value={formName} />

              <Row>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="firstName"
                    label="First Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="text"
                    name="lastName"
                    label="Last Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="tel"
                    name="phoneNumber"
                    label="Phone Number"
                    required
                    validate={requiredPhoneNumber}
                  />
                </Column>
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    label="Email"
                    validate={requiredEmail}
                    required
                  />
                </Column>
              </Row>
              {isBuyer && (
                <>
                  <Heading styledAs="subtitle">Buying</Heading>
                  <Field
                    as={Input}
                    type="select"
                    name="buyingPriceRange"
                    options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                    label="Do you have a purchase price in mind?"
                    validate={requiredSelect}
                    required
                    setFieldValue={setFieldValue}
                    {...rest}
                  />
                  <Field
                    as={Input}
                    type="text"
                    name="buyingCities"
                    label="What city/cities are you looking to move to?"
                    validate={requiredField}
                    required
                  />
                </>
              )}
              {isSeller && (
                <>
                  <Heading styledAs="subtitle">Selling</Heading>
                  <Field
                    as={Input}
                    type="select"
                    name="sellersListingPriceInMind"
                    label="Do you have a listing price in mind?"
                    validate={requiredSelect}
                    required
                    options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                    setFieldValue={setFieldValue}
                    {...rest}
                  />
                  <Field
                    as={Input}
                    type="text"
                    name="sellersAddressLine1"
                    label="Address Line 1"
                    validate={requiredField}
                    required
                  />
                  <Field as={Input} type="text" name="sellersAddressLine2" label="Address Line 2" />
                  <Row>
                    <Column sm={5}>
                      <Field
                        type="text"
                        as={Input}
                        name="sellersCity"
                        label="City"
                        validate={requiredField}
                        required
                      />
                    </Column>
                    <Column sm={3}>
                      <Field
                        as={Input}
                        type="select"
                        name="state"
                        label="State"
                        validate={requiredSelect}
                        required
                        options={createOptionsFromManagedDropdownList(statesList)}
                        setFieldValue={setFieldValue}
                        {...rest}
                      />
                    </Column>
                    <Column sm={4}>
                      <Field
                        as={Input}
                        type="number"
                        name="zip"
                        label="Zip"
                        validate={requiredField}
                        required
                        maxLength={5}
                      />
                    </Column>
                  </Row>
                </>
              )}
              <HorizontalRule />
              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </PageContainer>
  );
};

export default MissingCity;
