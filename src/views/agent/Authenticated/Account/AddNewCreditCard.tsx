/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { CreditCard, Button, Row, Column, Input, Heading } from '../../../../components';
import { requiredField, requiredSelect } from '../../../../utils/validations';
import { createFortispayAccountvault } from '../../../../redux/ducks/fortis';
import { RootState } from '../../../../redux/ducks';
import { ActionResponseType } from '../../../../redux/constants';
import { createOptionsFromManagedDropdownList } from '../../../../utils/createOptionsFromArray';
import { addAlert } from '../../../../redux/ducks/globalAlerts';
import { unformattedCreditCardValue } from '../../../../utils/creditCard';

type AddNewCreditCardProps = {
  toggleModal: (value: boolean) => void;
};

const AddNewCreditCard: FunctionComponent<AddNewCreditCardProps> = (props) => {
  const dispatch = useDispatch();
  const agent = useSelector((state: RootState) => state.agent);
  const auth = useSelector((state: RootState) => state.auth);
  const fortis = useSelector((state: RootState) => state.fortis);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);

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
    <div>
      <Heading>Add a payment method</Heading>
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
                account_number: unformattedCreditCardValue(values.cardNumber),
                payment_method: 'cc',
                exp_date: `${values.cardExpirationMonth}${values.cardExpirationYear}`,
                billing_address: values.billingAddress,
                billing_city: values.billingCity,
                billing_state: values.billingState,
                billing_zip: values.billingZip.toString(),
              })
            ).then((response: ActionResponseType) => {
              if (response && !response.error) {
                setSubmitting(false);
                if (window && window.analytics) {
                  window.analytics.track('Agent added new payment method', {
                    user: auth.email,
                  });
                }
                dispatch(
                  addAlert({
                    type: 'success',
                    message: 'Successfully added new payment method',
                  })
                );
                props.toggleModal(false);
              }
            });
          }
        }}
      >
        {({ isSubmitting, isValid, values, ...rest }) => (
          <Form>
            <Row>
              <Column sm={8} smOffset={2}>
                <CreditCard values={values} />
              </Column>
            </Row>
            <Row>
              <Column sm={6}>
                <Field
                  as={Input}
                  type="text"
                  name="cardholderName"
                  label="Cardholder Name"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column sm={6}>
                <Field
                  as={Input}
                  type="creditCard"
                  name="cardNumber"
                  label="Card Number"
                  validate={requiredField}
                  required
                />
              </Column>
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
            <Field
              as={Input}
              type="text"
              name="billingAddress"
              label="Address"
              validate={requiredField}
              required
            />
            <Row>
              <Column sm={5}>
                <Field
                  as={Input}
                  type="text"
                  name="billingCity"
                  label="City"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column sm={3}>
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
              <Column sm={4}>
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
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting || fortis.isLoading}
              rightspacer
            >
              Save
            </Button>
            <Button type="button" color="dangerOutline" onClick={() => props.toggleModal(false)}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewCreditCard;
