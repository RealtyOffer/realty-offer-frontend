/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { navigate } from 'gatsby';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  HorizontalRule,
  Card,
  Seo,
  TimelineProgress,
  Row,
  Column,
  Input,
  Heading,
  CreditCard,
} from '../../../components';
import { requiredField, requiredSelect } from '../../../utils/validations';
import { updateAgentProfile } from '../../../redux/ducks/agent';
import { createFortispayAccountvault } from '../../../redux/ducks/fortis';
import { RootState } from '../../../redux/ducks';
import { CreateAccountvaultSuccessAction } from '../../../redux/ducks/fortis.d';
import { getStatesList } from '../../../redux/ducks/dropdowns';
import { createOptionsFromManagedDropdownList } from '../../../utils/createOptionsFromArray';
import { ActionResponseType } from '../../../redux/constants';

const PaymentInformation: FunctionComponent<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agent);
  const auth = useSelector((state: RootState) => state.auth);
  const fortis = useSelector((state: RootState) => state.fortis);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);

  useEffect(() => {
    if (statesList.length === 0) {
      dispatch(getStatesList());
    }
  }, []);

  useEffect(() => {
    if (!agent.fortispayContactId) {
      navigate('/agent/agent-information');
    }
  }, []);

  const initialValues = {
    cardholderName: `${auth.firstName} ${auth.lastName}`,
    cardNumber: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    billingAddress: '',
    billingCity: '',
    billingState: 'MI',
    billingZip: '',
  };

  const createExpYear = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    let y;
    for (y = currentYear; y < currentYear + 5; y += 1) {
      years.push({ value: String(y).substring(2, 4), label: String(y) });
    }

    return years;
  };
  return (
    <>
      <Seo title="Payment Information" />
      <TimelineProgress
        items={[
          'Create Account',
          'Verify Email',
          'Agent Info',
          'Business Info',
          'Payment Info',
          'Confirm',
        ]}
        currentStep={5}
      />
      <Card
        cardTitle="Payment Information"
        cardSubtitle="You will need a payment method on file before you can bid on listings"
      >
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            if (agent.fortispayContactId) {
              dispatch(
                createFortispayAccountvault({
                  email: auth.email,
                  contact_id: agent.fortispayContactId,
                  account_holder_name: values.cardholderName,
                  account_number: values.cardNumber.toString(),
                  payment_method: 'cc',
                  exp_date: `${values.cardExpirationMonth}${values.cardExpirationYear}`,
                  billing_address: values.billingAddress,
                  billing_city: values.billingCity,
                  billing_state: values.billingState,
                  billing_zip: values.billingZip.toString(),
                })
              ).then((response: CreateAccountvaultSuccessAction) => {
                dispatch(
                  updateAgentProfile({
                    ...agent,
                    fortispayAccountVaultId: response.payload.id,
                  })
                ).then((res: ActionResponseType) => {
                  if (res && !res.error) {
                    navigate('/agent/confirm-registration');
                  }
                });
                setSubmitting(false);
              });
            }
          }}
        >
          {({ isSubmitting, isValid, values, ...rest }) => (
            <Form>
              <CreditCard values={values} />
              <Heading as="h5">Payment Information</Heading>
              <Field
                as={Input}
                type="text"
                name="cardholderName"
                label="Cardholder Name"
                validate={requiredField}
                required
              />

              <Field
                as={Input}
                type="text"
                pattern="\d*"
                name="cardNumber"
                label="Card Number"
                validate={requiredField}
                required
                maxLength={19}
              />
              <Row>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="select"
                    name="cardExpirationMonth"
                    label="Expiration Month"
                    validate={requiredSelect}
                    options={[
                      { value: '01', label: '01 - January' },
                      { value: '02', label: '02 - February' },
                      { value: '03', label: '03 - March' },
                      { value: '04', label: '04 - April' },
                      { value: '05', label: '05 - May' },
                      { value: '06', label: '06 - June' },
                      { value: '07', label: '07 - July' },
                      { value: '08', label: '08 - August' },
                      { value: '09', label: '09 - September' },
                      { value: '10', label: '10 - October' },
                      { value: '11', label: '11 - November' },
                      { value: '12', label: '12 - December' },
                    ]}
                    required
                    {...rest}
                  />
                </Column>
                <Column xs={6}>
                  <Field
                    as={Input}
                    type="select"
                    name="cardExpirationYear"
                    label="Expiration Year"
                    validate={requiredSelect}
                    required
                    options={createExpYear()}
                    {...rest}
                  />
                </Column>
              </Row>

              <Heading as="h5">Billing Address</Heading>
              <Field
                as={Input}
                type="text"
                name="billingAddress"
                label="Address"
                validate={requiredField}
                required
              />
              <Row>
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
                <Column md={3}>
                  <Field
                    as={Input}
                    type="select"
                    name="billingState"
                    label="State"
                    validate={requiredSelect}
                    required
                    options={createOptionsFromManagedDropdownList(statesList)}
                    {...rest}
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
                    maxLength={5}
                  />
                </Column>
              </Row>
              <Button
                type="submit"
                color="primary"
                block
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting || fortis.isLoading}
              >
                Review
              </Button>
              <small>
                You won&apos;t be charged yet, you will have a chance to review your information on
                the next page.
              </small>
            </Form>
          )}
        </Formik>
        <HorizontalRule />
        <Button type="button" onClick={() => {}} color="text" block>
          Save &amp; Complete Later
        </Button>
      </Card>
    </>
  );
};

export default PaymentInformation;
