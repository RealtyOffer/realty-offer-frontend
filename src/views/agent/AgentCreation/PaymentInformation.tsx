import React, { FunctionComponent, useEffect } from 'react';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

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
import { Formik, Form, Field } from 'formik';
import { requiredField } from '../../../utils/validations';
import { createFortispayContact } from '../../../redux/ducks/fortis';
import { useDispatch } from 'react-redux';

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const dispatch = useDispatch();

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
          >
            {({ isSubmitting, isValid, ...rest }) => (
              <Form>
                <Heading as="h5">Payment Information</Heading>
                <Row>
                <Column md={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="firstName"
                      label="First Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="lastName"
                      label="Last Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                </Row>
                <Row>
                  <Column md={8}>
                    <Field
                      as={Input}
                      type="text"
                      name="cardNumber"
                      label="Card Number"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={8}>
                    <Field
                      as={Input}
                      type="tel"
                      name="cardExpiration"
                      label="Card Expiration Date"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Row>
                    </Row>
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
                    <Field as={Input} type="text" name="billingAddressLine2" label="Address Cont." />
                  </Column>
                  <Column md={5}>
                    <Field
                      as={Input}
                      type="text"
                      name="billingCity"
                      label="City"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={4}>
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

              </Form>
            )}
          </Formik>
                    <HorizontalRule />
          <Button
            type="button"
            color="primary"
            block
            onClick={() => dispatch(createFortispayContact({first_name: 'Tom', last_name: 'Joe', email: 'Tom@joe.com'}))}
          >
            Make a Payment
          </Button>
          <Button type="button" onClick={() =>{}  
} color="text" block>
            Save &amp; Complete Later
          </Button>
        </>
      </Card>
    </ClientOnly>
  );
};

export default PaymentInformation;
