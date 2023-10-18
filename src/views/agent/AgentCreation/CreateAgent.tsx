import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from '@reach/router';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import {
  TimelineProgress,
  Button,
  Input,
  Row,
  Card,
  Column,
  HorizontalRule,
  Seo,
  Heading,
  Modal,
  Alert,
} from '../../../components';

import {
  requiredEmail,
  requiredField,
  requiredPhoneNumber,
  requiredPassword,
  passwordRulesString,
  requiredSelect,
} from '../../../utils/validations';
import { createUser } from '../../../redux/ducks/auth';
import { CreateUserFormValues } from '../../../redux/ducks/auth.d';
import { ActionResponseType } from '../../../redux/constants';
import { reformattedPhoneForCognito } from '../../../utils/phoneNumber';
import { addAlert } from '../../../redux/ducks/globalAlerts';
import { captureAgentSignupData } from '../../../redux/ducks/agent';
import { RootState } from '../../../redux/ducks';
import { baseBorderStyle } from '../../../styles/mixins';
import { baseSpacer } from '../../../styles/size';

type CreateAgentProps = {} & RouteComponentProps;

const CreateAgent: FunctionComponent<CreateAgentProps> = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);
  const initialValues: CreateUserFormValues & { referralSource: string } = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    confirmEmail: '',
    password: '',
    role: 'Agent',
    referralSource: '',
  };

  return (
    <>
      <Seo
        title="Sign Up"
        description="Create an account or sign up on Realty Offer. We help you sell your home as easy and stress-free as possible. Fill up the signup form to know how we can help you."
      />
      <TimelineProgress
        items={
          location.pathname.includes('pilot')
            ? ['Create Account', 'Verify Email', 'Agent Info', 'Confirm']
            : [
                'Create Account',
                'Verify Email',
                'Agent Info',
                'Business Info',
                'Payment Info',
                'Confirm',
              ]
        }
        currentStep={1}
      />
      <Card cardTitle="Sign Up As An Agent Today" cardSubtitle="Tell Us About Yourself">
        <Formik
          validate={(values) => {
            if (values.email && values.confirmEmail && values.confirmEmail !== values.email) {
              return { confirmEmail: 'Email address does not match the above' };
            }
            return {};
          }}
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            if (!modalIsOpen) {
              setModalIsOpen(true);
              setSubmitting(false);
            }
            if (modalIsOpen) {
              addToMailchimp(values.email, {
                FNAME: values.firstName,
                LNAME: values.lastName,
                PHONE: values.phoneNumber,
                'group[78807][2]': '2',
              });
              if (window && window.analytics) {
                window.analytics.track('Agent Signup', {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phoneNumber: values.phoneNumber,
                  email: values.email,
                  role: 'Agent',
                  referralSource: values.referralSource,
                });
              }
              dispatch(
                captureAgentSignupData({
                  isPilotUser: location.pathname.includes('pilot'),
                  referralSource: values.referralSource,
                })
              );
              dispatch(
                createUser({
                  ...values,
                  phoneNumber: `${reformattedPhoneForCognito(values.phoneNumber)}`,
                })
              ).then((response: ActionResponseType) => {
                setSubmitting(false);
                if (response && !response.error) {
                  dispatch(
                    addAlert({
                      message:
                        'Successfully created account. Check your email for a verification code',
                      type: 'success',
                    })
                  );
                  navigate('/agent/verify-email');
                }
              });
            }
          }}
        >
          {({ isSubmitting, isValid, handleSubmit, setFieldValue, ...rest }) => (
            <Form>
              {location.pathname.includes('pilot') && (
                <Alert
                  type="info"
                  message="Congratulations, you have been selected for a private pilot account on RealtyOffer!"
                />
              )}
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
              </Row>
              <Field
                as={Input}
                type="tel"
                name="phoneNumber"
                label="Phone Number"
                validate={requiredPhoneNumber}
                required
                placeholder="XXX-XXX-XXXX"
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
                type="email"
                name="confirmEmail"
                label="Confirm Email Address"
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
              <Field
                as={Input}
                type="select"
                name="referralSource"
                options={[
                  { value: 'Google', label: 'Google' },
                  { value: 'Social Media', label: 'Social Media' },
                  { value: 'Radio', label: 'Radio' },
                  { value: 'TV', label: 'TV' },
                  { value: 'Print', label: 'Print' },
                  { value: 'Word of Mouth', label: 'Word of Mouth' },
                  { value: 'Other', label: 'Other' },
                ]}
                label="How did you hear about RealtyOffer?"
                validate={requiredSelect}
                setFieldValue={setFieldValue}
                required
                {...rest}
              />
              <HorizontalRule />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                block
                isLoading={isSubmitting || auth.isLoading}
              >
                Create Account
              </Button>
              <Modal toggleModal={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
                <Heading styledAs="title">RealtyOffer Terms of Use</Heading>
                <div
                  style={{
                    height: 300,
                    overflowY: 'scroll',
                    border: baseBorderStyle,
                    padding: baseSpacer,
                    marginBottom: baseSpacer,
                  }}
                >
                  <p>
                    You must read and agree to our Terms of Use (the <strong>“Agreement”</strong>)
                    because it forms the binding contract between you and RealtyOffer in connection
                    with your use of the Service. Below please find a short summary of the Agreement
                    (with capitalized terms defined in the Agreement). The Agreement and Service may
                    be modified or discontinued at any time.
                  </p>
                  <p>
                    <strong>Acceptance.</strong> By using the Service, you agree to the terms of use
                    and any other terms provided by us to you in connection with the Service.
                  </p>
                  <p>
                    <strong>Content.</strong> You grant RealtyOffer the right to display your
                    profile and Content. You agree that all of your Content is accurate and
                    truthful.
                  </p>
                  <p>
                    <strong>Rights.</strong> RealtyOffer grants you the right to use the Service as
                    authorized and permitted by the Agreement. See the Agreement for a full list of
                    your representations and obligations with respect to the Service.
                  </p>
                  <p>
                    <strong>Agents.</strong> If you are an Agent, you agree to pay RealtyOffer a
                    marketing fee when a lead is awarded.
                  </p>
                  <p>
                    <strong>Termination.</strong> Each of us may terminate your account at any time.
                  </p>
                  <p>
                    <strong>Disclaimers.</strong> RealtyOffer does not guarantee any results in
                    connection with your use of the Service. The Service is provided “as is,” and we
                    disclaim legal liability for the quality, safety, or reliability of the Service.
                  </p>
                  <p>
                    <strong>Indemnity.</strong> You agree to indemnify us for actions arising out of
                    your use of the Service, your Content or your violation of this Agreement.
                  </p>
                  <p>
                    <strong>Limitation of Liability.</strong> We will not be liable for any indirect
                    damages. Our liability for direct damages will be limited to the amount paid by
                    you during the twelve (12) month period preceding the date the first claim
                    accrued.{' '}
                  </p>
                </div>
                <Row>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => setModalIsOpen(false)}
                      color="dangerOutline"
                      block
                    >
                      Cancel
                    </Button>
                  </Column>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => handleSubmit()}
                      disabled={isSubmitting || !isValid}
                      block
                      isLoading={isSubmitting || auth.isLoading}
                    >
                      Agree
                    </Button>
                  </Column>
                </Row>
                <br />
                <p style={{ textAlign: 'center' }}>
                  <a
                    href={location.pathname.includes('pilot') ? '/pilot-terms' : '/terms'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Terms of Use
                  </a>
                </p>
              </Modal>
              <p style={{ textAlign: 'center' }}>
                <small>
                  By clicking &quot;Create Account&quot;, I agree to the{' '}
                  <a
                    href={location.pathname.includes('pilot') ? '/pilot-terms' : '/terms'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Use
                  </a>
                  .
                </small>
              </p>
            </Form>
          )}
        </Formik>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login/">Log In Now</Link>
        </p>
      </Card>
    </>
  );
};

export default CreateAgent;
