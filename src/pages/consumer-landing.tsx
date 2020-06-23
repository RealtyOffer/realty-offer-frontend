import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';

import {
  Button,
  Card,
  HorizontalRule,
  Input,
  Row,
  Column,
  PageContainer,
  LoadingPage,
} from '../components';
import {
  requiredField,
  requiredEmail,
  requiredSelect,
  requiredPhoneNumber,
} from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import { getPriceRangesList } from '../redux/ducks/dropdowns';
import { RootState } from '../redux/ducks';
import { createOptionsFromManagedDropdownList } from '../utils/createOptionsFromArray';

const ConsumerLandingForm: FunctionComponent<{}> = () => {
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    homeValue: '',
    styleOfHome: '',
    estimatedSquareFootage: '',
    conditionOfHome: '',
    freeMortgageConsult: false,
    type: '',
    where: '',
    message: '',
  };

  useEffect(() => {
    dispatch(getPriceRangesList());
  }, []);

  const encode = (data: { [key: string]: string | boolean }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <PageContainer>
      <Card cardTitle="Connect with a RealtyOffer Specialist">
        {priceRangesList.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values) => {
              fetch('https://realtyoffer.com/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode({
                  'form-name': 'consumer-landing',
                  ...values,
                }),
              })
                .then(() => {
                  navigate('/landing');
                  dispatch(
                    addAlert({
                      message: 'Thanks for your interest! We will be reaching out shortly.',
                      type: 'success',
                    })
                  );
                })
                .catch(() => {
                  dispatch(
                    addAlert({
                      message: 'Something went wrong, please try again.',
                      type: 'danger',
                    })
                  );
                });
            }}
          >
            {({ values, isSubmitting, isValid, ...rest }) => (
              <Form
                name="consumer-landing"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="consumer-landing" />
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
                      name="phone"
                      label="Phone Number"
                      validate={requiredPhoneNumber}
                      required
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

                <Field
                  as={Input}
                  type="select"
                  name="type"
                  options={[
                    { value: 'Sell My Home', label: 'Sell My Home' },
                    { value: 'Buy', label: 'Buy' },
                    { value: 'Both Buy & Sell', label: 'Both Buy & Sell' },
                  ]}
                  label="What are you looking to do?"
                  validate={requiredSelect}
                  required
                  {...rest}
                />
                <Field
                  as={Input}
                  type="text"
                  name="where"
                  label="Where?"
                  validate={requiredField}
                  required
                />
                <Field
                  as={Input}
                  type="select"
                  name="homeValue"
                  options={createOptionsFromManagedDropdownList(priceRangesList.slice(1))}
                  label="Estimated Home Value"
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="styleOfHome"
                  options={[
                    { value: 'Colonial', label: 'Colonial' },
                    { value: 'Ranch', label: 'Ranch' },
                    { value: 'Condo/Townhome', label: 'Condo/Townhome' },
                  ]}
                  label="Style of Home"
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="estimatedSquareFootage"
                  options={[
                    { value: 'Less than 1,000 ft²', label: 'Less than 1,000 ft²' },
                    { value: '1,000-2,000 ft²', label: '1,000-2,000 ft²' },
                    { value: '2,000-3,000 ft²', label: '2,000-3,000 ft²' },
                    { value: '3,000-4,000 ft²', label: '3,000-4,000 ft²' },
                    { value: '4,000-5,000 ft²', label: '4,000-5,000 ft²' },
                    { value: 'More than 5,000 ft²', label: 'More than 5,000 ft²' },
                  ]}
                  label="Estimated Square Footage"
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="conditionOfHome"
                  options={[
                    { value: 'Fair', label: 'Fair' },
                    { value: 'Good', label: 'Good' },
                    { value: 'Excellent', label: 'Excellent' },
                  ]}
                  label="Condition of Home"
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
                  type="textarea"
                  name="message"
                  label="Any questions or comments?"
                />
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
        ) : (
          <LoadingPage />
        )}
      </Card>
    </PageContainer>
  );
};

export default ConsumerLandingForm;
