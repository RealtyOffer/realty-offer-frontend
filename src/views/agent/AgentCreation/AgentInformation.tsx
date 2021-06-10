/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'gatsby';
import { RouteComponentProps } from '@reach/router';
import { format, addMonths } from 'date-fns';

import {
  Row,
  Column,
  Button,
  Input,
  Heading,
  TimelineProgress,
  HorizontalRule,
  Card,
  Seo,
  LoadingPage,
} from '../../../components';
import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredSelect,
} from '../../../utils/validations';
import { createAgentProfile, captureAgentSignupData } from '../../../redux/ducks/agent';
import { ActionResponseType } from '../../../redux/constants';
import { RootState } from '../../../redux/ducks';
import { logout } from '../../../redux/ducks/auth';
import { createFortispayContact } from '../../../redux/ducks/fortis';
import { getGendersList, getStatesList } from '../../../redux/ducks/dropdowns';
import { createOptionsFromManagedDropdownList } from '../../../utils/createOptionsFromArray';
import { getUserCities } from '../../../redux/ducks/user';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { reformattedPhoneForFortis } from '../../../utils/phoneNumber';
import postFormUrlEncoded from '../../../utils/postFormUrlEncoded';

type AgentInformationProps = {};

const AgentInformation: FunctionComponent<AgentInformationProps & RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);
  const fortis = useSelector((state: RootState) => state.fortis);
  const statesList = useSelector((state: RootState) => state.dropdowns.states.list);
  const gendersList = useSelector((state: RootState) => state.dropdowns.genders.list);
  const cities = useSelector((state: RootState) => state.user.cities);

  const initialValues = {
    state: 'MI',
    agentId: '',
    brokerName: '',
    brokerAddressLine1: '',
    brokerAddressLine2: '',
    brokerCity: '',
    brokerZip: '',
    brokerState: 'MI',
    brokerPhoneNumber: '',
    brokerEmail: '',
    emailAddress: auth.email,
    genderId: '',
    birthYear: '',
    id: 0,
  };

  useEffect(() => {
    dispatch(getStatesList());
    dispatch(getUserCities());
    dispatch(getGendersList());
  }, []);

  useEffect(() => {
    if (!auth.isLoading && !auth.isLoggedIn) {
      navigate('/agent/sign-up');
    }
  }, []);

  const save = () => {
    dispatch(logout());
    if (window && window.analytics) {
      window.analytics.track('Logout', {
        location: 'Agent Information',
      });
    }
    navigate('/');
  };

  return (
    <>
      <Seo title="Agent Information" />
      <TimelineProgress
        items={
          agent && agent.signupData.isPilotUser
            ? ['Create Account', 'Verify Email', 'Agent Info', 'Confirm']
            : [
                'Create Account',
                'Verify Email',
                'Agent Info',
                'Business Info',
                'Payment',
                'Confirm',
              ]
        }
        currentStep={3}
      />
      <Card
        cardTitle="Agent Information"
        cardSubtitle="Get started by simply providing your Agent Information"
      >
        {statesList.length > 0 && cities && cities.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                createFortispayContact({
                  email: auth.email,
                  first_name: auth.firstName,
                  last_name: auth.lastName,
                  home_phone: reformattedPhoneForFortis(auth.phoneNumber),
                  office_phone: values.brokerPhoneNumber.replace(/\W/g, ''),
                  address: `${values.brokerAddressLine1} ${values.brokerAddressLine2}`,
                  city: values.brokerCity,
                  state: values.brokerState,
                  zip: String(values.brokerZip),
                  company_name: values.brokerName,
                })
              ).then((res: ActionResponseType) => {
                if (res && res.error) {
                  const fortispayError = Object.values(res.payload)[0];
                  dispatch(
                    addAlert({
                      message: fortispayError,
                      type: 'danger',
                    })
                  );
                  setSubmitting(false);
                } else if (res && !res.error) {
                  dispatch(
                    createAgentProfile({
                      ...values,
                      fortispayContactId: res.payload.id,
                      genderId: Number(values.genderId),
                      birthYear: Number(values.birthYear),
                      aboutMe: '',
                      certificates: '',
                      agentLanguages: [],
                      brokerZip: String(values.brokerZip),
                      brokerPhoneNumber: values.brokerPhoneNumber,
                      // sign up pilot user for all cities, otherwise keep blank for now until next step
                      cities: agent.signupData.isPilotUser ? cities : [],
                      licenseExpirationDate: format(
                        addMonths(new Date(), agent.signupData.isPilotUser ? 12 : 3),
                        `yyyy-MM-dd'T'HH:mm`
                      ),
                      isPilotUser: agent.signupData.isPilotUser,
                      bidDefaults: {},
                    })
                  ).then((response: ActionResponseType) => {
                    if (response && !response.error) {
                      if (process.env.GATSBY_ENVIRONMENT !== 'DEVELOP') {
                        postFormUrlEncoded('new-agent-account-created', {
                          subject: `New Agent Account Created: ${auth.firstName} ${auth.lastName}`,
                          firstName: auth.firstName,
                          lastName: auth.lastName,
                          email: auth.email,
                          phoneNumber: auth.phoneNumber,
                          isPilotUser: agent.signupData.isPilotUser,
                          agentId: values.agentId,
                          brokerName: values.brokerName,
                          brokerAddressLine1: values.brokerAddressLine1,
                          brokerAddressLine2: values.brokerAddressLine2,
                          brokerCity: values.brokerCity,
                          brokerZip: values.brokerZip,
                          brokerState: 'MI',
                          brokerPhoneNumber: values.brokerPhoneNumber,
                          brokerEmail: values.brokerEmail,
                        });
                      }
                      if (agent && agent.signupData.isPilotUser) {
                        dispatch(
                          captureAgentSignupData({
                            // sign up pilot user for all cities, but for free
                            cities,
                            total: undefined,
                          })
                        );
                        navigate('/agent/confirm-registration');
                      } else {
                        navigate('/agent/business-information');
                      }
                      setSubmitting(false);
                    }
                  });
                }
              });
            }}
          >
            {({ isSubmitting, isValid, setFieldValue, ...rest }) => (
              <Form
                name="new-agent-account-created"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                onBlur={() =>
                  setFieldValue(
                    'subject',
                    `New Agent Account Created: ${auth.firstName} ${auth.lastName}`
                  )
                }
              >
                <input type="hidden" name="form-name" value="new-agent-account-created" />
                <input
                  type="hidden"
                  name="subject"
                  value={`New Agent Account Created: ${auth.firstName} ${auth.lastName}`}
                />
                <Heading as="h5">Agent Information</Heading>
                <Row>
                  <Column md={8}>
                    <Field
                      as={Input}
                      type="text"
                      name="agentId"
                      label="Agent ID"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="select"
                      name="state"
                      label="State"
                      validate={requiredField}
                      required
                      disabled
                      options={createOptionsFromManagedDropdownList(statesList)}
                      {...rest}
                    />
                  </Column>
                </Row>
                <Field
                  as={Input}
                  type="select"
                  name="genderId"
                  label="Gender"
                  options={createOptionsFromManagedDropdownList(gendersList)}
                  validate={requiredSelect}
                  required
                  helpText="Why do we ask? Some consumers may prefer to only work with certain genders due to religious or cultural reasons."
                  {...rest}
                />

                <Field
                  as={Input}
                  type="text"
                  name="birthYear"
                  label="Year of Birth"
                  placeholder="XXXX"
                  maxLength={4}
                  validate={requiredField}
                  required
                  helpText="Why do we ask? Some consumers may prefer to only work with certain age ranges."
                />

                <Heading as="h5">Broker Information</Heading>
                <Row>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerName"
                      label="Broker Name"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={6}>
                    <Field
                      as={Input}
                      type="tel"
                      name="brokerPhoneNumber"
                      label="Broker Phone Number"
                      validate={requiredPhoneNumber}
                      required
                      placeholder="XXX-XXX-XXXX"
                    />
                  </Column>
                  <Column>
                    <Field
                      as={Input}
                      type="email"
                      name="brokerEmail"
                      label="Broker Email"
                      validate={requiredEmail}
                      required
                    />
                  </Column>
                  <Column>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerAddressLine1"
                      label="Address"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column>
                    <Field as={Input} type="text" name="brokerAddressLine2" label="Address Cont." />
                  </Column>
                  <Column md={5}>
                    <Field
                      as={Input}
                      type="text"
                      name="brokerCity"
                      label="City"
                      validate={requiredField}
                      required
                    />
                  </Column>
                  <Column md={3}>
                    <Field
                      as={Input}
                      type="select"
                      name="brokerState"
                      label="State"
                      validate={requiredField}
                      required
                      options={createOptionsFromManagedDropdownList(statesList)}
                      {...rest}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="brokerZip"
                      label="Zip"
                      validate={requiredField}
                      required
                    />
                  </Column>
                </Row>

                <HorizontalRule />
                <p>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    block
                    isLoading={isSubmitting || fortis.isLoading || agent.isLoading}
                  >
                    Continue
                  </Button>
                </p>
              </Form>
            )}
          </Formik>
        ) : (
          <LoadingPage />
        )}
        <Button type="button" onClick={() => save()} color="text" block>
          Complete Later
        </Button>
      </Card>
    </>
  );
};

export default AgentInformation;
