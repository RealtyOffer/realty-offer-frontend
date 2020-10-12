import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, Box, Heading } from '.';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { RootState } from '../redux/ducks';
import { getDropdownListText } from '../utils/dropdownUtils';

type GetFinancedFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city?: string;
  state?: string;
  buyingPriceRange?: string;
  preApproved?: boolean;
  freeMortgageConsult?: boolean;
  subject: string;
};

type Props = {};

const GetFinancedWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const GetFinancedForm: FunctionComponent<Props> = () => {
  const formName = 'get-financed-form';
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const consumer = useSelector((state: RootState) => state.consumer);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const initialValues: GetFinancedFormValues = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
    phoneNumber: auth.phoneNumber,
    city: consumer?.listing?.sellersCity?.name,
    state: consumer?.listing?.sellersCity?.state,
    buyingPriceRange: consumer?.listing?.buyingPriceRangeId
      ? getDropdownListText(priceRangesList, String(consumer.listing.buyingPriceRangeId))
      : '',
    preApproved: consumer?.listing?.preApproved,
    freeMortgageConsult: consumer?.listing?.freeMortgageConsult,
    subject: `Finance Interest: ${auth.firstName} ${auth.lastName}`,
  };

  return (
    <GetFinancedWrapper>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          return postFormUrlEncoded('https://realtyoffer.com/', formName, values).then(() => {
            setSubmitting(false);
            resetForm();
            dispatch(
              addAlert({
                message: `Your information has been submitted! A RealtyOffer Mortgage Consultant will contact you shortly.`,
                type: 'success',
              })
            );
          });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form name={formName} method="post" netlify-honeypot="bot-field" data-netlify="true">
            <Box>
              <Heading as="h4" styledAs="subtitle">
                Need a mortgage?
              </Heading>
              <p>
                Interested in connecting with one of our mortgage consultants who will help you get
                approved for your new home loan?
              </p>
              <input type="hidden" name="form-name" value={formName} />
              <input
                type="hidden"
                name="subject"
                value={`Finance Interest: ${auth.firstName} ${auth.lastName}`}
              />
              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
              >
                Send My Info
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </GetFinancedWrapper>
  );
};

export default GetFinancedForm;
