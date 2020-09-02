/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { parse, format } from 'date-fns';
import {
  Button,
  ProgressBar,
  HorizontalRule,
  Card,
  Seo,
  ClientOnly,
  Row,
  Column,
  Input,
  Heading,
} from '../../../components';
import { requiredField } from '../../../utils/validations';
import { createFortispayAccountvault } from '../../../redux/ducks/fortis';
import { RootState } from '../../../redux/ducks';

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const initialValues = {
    cardholderName: '',
    cardNumber: '5454545454545454',
    cardExpiration: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingCity: '',
    billingZip: '',
  };
  return (
    <ClientOnly>
      <Card
        cardTitle="Payment Information"
        cardSubtitle="We will save this information for fast, easy, &amp; convenient in-app purchases"
      >
        <>
          <Seo title="Payment Information" />
          <ProgressBar value={100} label="Step 3/3" name="progress" />
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values) => {
              dispatch(
                createFortispayAccountvault({
                  email: `${new Date().getMilliseconds().toString()}@notawebsite.uuu`,
                  contact_id: '11eaed642ab8ee4a8c8a4524', // This comes from fortis
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  account_holder_name: values.cardholderName,
                  account_number: values.cardNumber.toString(),
                  payment_method: 'cc',
                  exp_date: format(parse(values.cardExpiration, 'yyyy-MM', new Date()), 'MMyy'),
                  billing_address: `${values.billingAddressLine1} ${values.billingAddressLine2}`,
                  billing_city: values.billingCity,
                  billing_zip: values.billingZip.toString(),
                })
              ).then((response: ActionResponseType) => {
                alert(response.payload.id);
              });
            }}
          >
            {({ isSubmitting, isValid, ...rest }) => (
              <Form>
                <Heading as="h5">Payment Information</Heading>
                <Row>
                  <Column md={12}>
                    <Field
                      as={Input}
                      type="text"
                      name="cardholderName"
                      label="Cardholder Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                </Row>
                <Row>
                  <Column md={12}>
                    <Field
                      as={Input}
                      type="number"
                      name="cardNumber"
                      label="Card Number"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={12}>
                    <Field
                      as={Input}
                      type="month"
                      name="cardExpiration"
                      label="Card Expiration"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Row />
                  <Column>
                    <Heading as="h5">Billing Address</Heading>
                    <Field
                      as={Input}
                      type="text"
                      name="billingAddressLine1"
                      label="Address"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column>
                    <Field
                      as={Input}
                      type="text"
                      name="billingAddressLine2"
                      label="Address Cont."
                    />
                  </Column>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="billingCity"
                      label="City"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="number"
                      name="billingZip"
                      label="Zip"
                      validate={requiredField}
                      required
                    />
                  </Column>
                </Row>
                <Button type="submit" color="primary" block disabled={isSubmitting || !isValid}>
                  Make a Payment
                </Button>
              </Form>
            )}
          </Formik>
          <HorizontalRule />
          <Button type="button" onClick={() => {}} color="text" block>
            Save &amp; Complete Later
          </Button>
        </>
      </Card>
    </ClientOnly>
  );
};

export default PaymentInformation;
