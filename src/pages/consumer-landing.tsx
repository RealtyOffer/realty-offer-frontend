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
import { getPriceRangesList, getHomeTypesList } from '../redux/ducks/dropdowns';
import { RootState } from '../redux/ducks';
import { createOptionsFromManagedDropdownList } from '../utils/createOptionsFromArray';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { getDropdownListText } from '../utils/dropdownUtils';

const ConsumerLandingForm: FunctionComponent<{}> = () => {
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const homesTypeList = useSelector((state: RootState) => state.dropdowns.homeTypes.list);
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
    subject: '',
  };

  useEffect(() => {
    dispatch(getPriceRangesList());
    dispatch(getHomeTypesList());
  }, []);

  return (
    <PageContainer>
      <Card cardTitle="Connect with a RealtyOffer Specialist">
        {priceRangesList.length > 0 && homesTypeList.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              const valuesWithSubject = {
                ...values,
                homeValue: getDropdownListText(priceRangesList, values.homeValue),
                styleOfHome: getDropdownListText(homesTypeList, values.styleOfHome),
                subject: `New Interested Consumer: ${values.firstName} ${values.lastName} - ${values.type}`,
              };
              postFormUrlEncoded('https://realtyoffer.com/', 'consumer-landing', valuesWithSubject)
                .then(() => {
                  resetForm();
                  setSubmitting(false);
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
            {({ values, isSubmitting, isValid, setFieldValue, ...rest }) => (
              <Form
                name="consumer-landing"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                onBlur={() =>
                  setFieldValue(
                    'subject',
                    `New Interested Consumer: ${values.firstName} ${values.lastName} - ${values.type}`
                  )
                }
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
                  setFieldValue={setFieldValue}
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
                  setFieldValue={setFieldValue}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="styleOfHome"
                  options={createOptionsFromManagedDropdownList(homesTypeList)}
                  label="Style of Home"
                  setFieldValue={setFieldValue}
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
                  setFieldValue={setFieldValue}
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
                  setFieldValue={setFieldValue}
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
