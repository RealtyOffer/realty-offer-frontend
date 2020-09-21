import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';
import { RouteComponentProps } from '@reach/router';

import { PageContainer, Button, Card, Input, HorizontalRule, Seo, Heading } from '../components';

import { requiredField, requiredSelect } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { RootState } from '../redux/ducks';
import { createOptionsFromManagedDropdownList } from '../utils/createOptionsFromArray';

type MissingCityFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
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
  const formName = 'missing-city';
  const { firstName, lastName, phoneNumber, email } = useSelector((state: RootState) => state.auth);
  const consumer = useSelector((state: RootState) => state.consumer);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const isBuyer = consumer?.listing?.type?.toLowerCase().includes('buyer');
  const isSeller = consumer?.listing?.type?.toLowerCase().includes('seller');
  const initialValues = {
    firstName,
    lastName,
    phoneNumber,
    email,
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

            let postingValues: MissingCityFormValues = { ...rest };

            if (isBuyer) {
              postingValues = { ...postingValues, buyingCities, buyingPriceRange };
            }

            if (isSeller) {
              postingValues = {
                ...postingValues,
                sellersAddressLine1,
                sellersAddressLine2,
                sellersCity,
                sellersListingPriceInMind,
              };
            }

            return postFormUrlEncoded('https://realtyoffer.com/', formName, postingValues)
              .then(() => {
                setSubmitting(false);
                resetForm();
                dispatch(
                  addAlert({
                    message: 'Thanks for your message. We will be in touch shortly!',
                    type: 'success',
                  })
                );
              })
              .catch(() => {
                setSubmitting(false);
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again.',
                    type: 'danger',
                  })
                );
              });
          }}
        >
          {({ isSubmitting, isValid, ...rest }) => (
            <Form
              name="missing-city"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value={formName} />
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
                    validate={requiredField}
                    required
                    options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
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
                  <Field
                    type="text"
                    as={Input}
                    name="sellersCity"
                    label="City"
                    validate={requiredField}
                    required
                  />
                </>
              )}
              <HorizontalRule />
              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
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
