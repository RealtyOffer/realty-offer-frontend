import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import {
  Button,
  Seo,
  Input,
  Row,
  Card,
  Column,
  HorizontalRule,
  ProgressBar,
  ClientOnly,
} from '../../../components';

import {
  requiredEmail,
  requiredSelect,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
} from '../../../utils/validations';
import { createUser } from '../../../redux/ducks/auth';
import { CreateUserFormValues } from '../../../redux/ducks/auth.d';
import { ActionResponseType } from '../../../redux/constants';
import { createConsumerProfile } from '../../../redux/ducks/consumer';
import UnsavedChangesModal from './UnsavedChangesModal';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { RootState } from '../../../redux/ducks';
import { reformattedPhoneForCognito } from '../../../utils/phoneNumber';
import postFormUrlEncoded from '../../../utils/postFormUrlEncoded';
import { getDropdownListText } from '../../../utils/dropdownUtils';

type CreateConsumerProps = {} & RouteComponentProps;

const CreateConsumer: FunctionComponent<CreateConsumerProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const consumer = useSelector((state: RootState) => state.consumer);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const homeTypesList = useSelector((state: RootState) => state.dropdowns.homeTypes.list);
  const dispatch = useDispatch();

  const initialValues: CreateUserFormValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    role: 'Consumer',
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const isBuyerAndSeller = consumer.listing && consumer.listing.type === 'buyerSeller';

  return (
    <ClientOnly>
      <Seo title="Ready to buy or sell a home?" />
      <Card cardTitle="Create Account" cardSubtitle="Tell Us About Yourself">
        <>
          <ProgressBar
            value={100}
            label={`Step ${isBuyerAndSeller ? 4 : 3}/${isBuyerAndSeller ? 4 : 3}`}
            name="progress"
          />
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                createUser({
                  ...values,
                  phoneNumber: reformattedPhoneForCognito(values.phoneNumber),
                })
              ).then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  dispatch(
                    createConsumerProfile({
                      email: values.email,
                      listing: {
                        ...consumer.listing,
                        sellersZip: (consumer.listing && String(consumer.listing.sellersZip)) || '',
                        createDateTime: new Date(),
                      },
                      profile: {
                        otherLanguageId: undefined,
                        genderPreferenceId: undefined,
                        agePreferenceId: undefined,
                      },
                    })
                  ).then((secondRes: ActionResponseType) => {
                    if (secondRes && !secondRes.error) {
                      dispatch(
                        addAlert({
                          message: 'Successfully created your profile!',
                          type: 'success',
                        })
                      );
                      if (consumer.listing?.freeMortgageConsult) {
                        postFormUrlEncoded('free-mortgage-consultation', {
                          ...consumer.listing,
                          buyingCities: consumer?.listing?.buyingCities
                            ?.map((city) => city.name)
                            .toString(),
                          sellersCity: consumer?.listing?.sellersCity?.name,
                          sellersState: consumer?.listing?.sellersCity?.state,
                          sellingPriceRange: consumer?.listing
                            ?.sellersListingPriceInMindPriceRangeInMindId
                            ? getDropdownListText(
                                priceRangesList,
                                String(consumer.listing.sellersListingPriceInMindPriceRangeInMindId)
                              )
                            : '',
                          buyingPriceRange: consumer?.listing?.buyingPriceRangeId
                            ? getDropdownListText(
                                priceRangesList,
                                String(consumer.listing.buyingPriceRangeId)
                              )
                            : '',
                          buyerTypeOfHomeId: consumer?.listing?.buyerTypeOfHomeId
                            ? getDropdownListText(
                                homeTypesList,
                                String(consumer.listing.buyerTypeOfHomeId)
                              )
                            : '',
                          sellerTypeOfHomeId: consumer?.listing?.sellerTypeOfHomeId
                            ? getDropdownListText(
                                homeTypesList,
                                String(consumer.listing.sellerTypeOfHomeId)
                              )
                            : '',
                          sellersMortgageBalanceId: consumer?.listing?.sellersMortgageBalanceId
                            ? getDropdownListText(
                                priceRangesList,
                                String(consumer.listing.sellersMortgageBalanceId)
                              )
                            : '',
                          firstName: values.firstName,
                          lastName: values.lastName,
                          email: values.email,
                          phoneNumber: values.phoneNumber,
                          subject: `Mortgage Consultation Request: ${values.firstName} ${values.lastName}`,
                        });
                      }
                    }
                  });
                  navigate('/consumer/verify-email');
                }
              });
            }}
          >
            {({ isSubmitting, isValid, values, setFieldValue }) => (
              <Form
                name="free-mortgage-consultation"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                onBlur={() =>
                  setFieldValue(
                    'subject',
                    `Mortgage Consultation Request: ${values.firstName} ${values.lastName}`
                  )
                }
              >
                <input type="hidden" name="form-name" value="free-mortgage-consultation" />
                <input
                  type="hidden"
                  name="subject"
                  value={`Mortgage Consultation Request: ${values.firstName} ${values.lastName}`}
                />
                <Row>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="firstName"
                      label="First Name"
                      validate={requiredSelect}
                      required
                    />
                  </Column>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="lastName"
                      label="Last Name"
                      validate={requiredSelect}
                      required
                    />
                  </Column>
                </Row>
                <Field
                  as={Input}
                  type="tel"
                  name="phoneNumber"
                  label="Phone Number"
                  validate={requiredPhoneNumber}
                  required
                />
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  label="Email Address"
                  validate={requiredEmail}
                  required
                />
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  label="Password"
                  helpText={passwordRulesString}
                  validate={requiredPassword}
                  required
                />
                <HorizontalRule />
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  block
                  isLoading={isSubmitting || auth.isLoading || consumer.isLoading}
                >
                  Create Account
                </Button>
                <p style={{ textAlign: 'center' }}>
                  <small>
                    By clicking &quot;Create Account&quot;, I agree to the{' '}
                    <a href="/terms" target="_blank">
                      Terms &amp; Conditions
                    </a>
                    .
                  </small>
                </p>
              </Form>
            )}
          </Formik>
          <Button type="button" onClick={() => toggleUnsavedChangesModal()} color="text" block>
            Cancel
          </Button>
        </>
      </Card>
      <UnsavedChangesModal modalIsOpen={modalIsOpen} toggleModal={toggleUnsavedChangesModal} />
    </ClientOnly>
  );
};

export default CreateConsumer;
