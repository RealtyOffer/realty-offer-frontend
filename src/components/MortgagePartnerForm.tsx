import React, { FunctionComponent, useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';

import { Button, Box, Heading } from '.';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { RootState } from '../redux/ducks';

type MortgagePartnerFormProps = {};

const MortgagePartnerWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const MortgagePartnerForm: FunctionComponent<MortgagePartnerFormProps> = () => {
  const formName = 'mortgage-partner-form';
  const [showForm, setShowForm] = useState(true);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const agent = useSelector((state: RootState) => state.agent);

  const initialValues = {
    firstName: auth.firstName,
    lastName: auth.lastName,
    email: auth.email,
    phoneNumber: auth.phoneNumber,
    subject: `Mortgage Partner Interest: ${auth.firstName} ${auth.lastName}`,
    brokerName: agent.brokerName,
    brokerPhoneNumber: agent.brokerPhoneNumber,
    brokerEmail: agent.brokerEmail,
    brokerCity: agent.brokerCity,
  };

  if (!showForm) {
    return null;
  }

  return (
    <MortgagePartnerWrapper>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          postFormUrlEncoded(formName, values)
            .then(() => {
              setSubmitting(false);
              resetForm();
              dispatch(
                addAlert({
                  message: `Your information has been submitted! A RealtyOffer Mortgage Consultant will contact you shortly.`,
                  type: 'success',
                })
              );
              if (window && window.analytics) {
                window.analytics.track(`${formName} completed`, {
                  ...values,
                });
              }
              setShowForm(false);
            })
            .catch(() => {
              setSubmitting(false);
              dispatch(
                addAlert({
                  message: 'Something went wrong, please try again.',
                  type: 'danger',
                })
              );
              if (window && window.analytics) {
                window.analytics.track(`${formName} failure`, {
                  ...values,
                });
              }
            });
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form name={formName} method="post" netlify-honeypot="bot-field" data-netlify="true">
            <Box>
              <Heading as="h4" styledAs="subtitle">
                Need a mortgage partner?
              </Heading>
              <p>Second Opinion? Our Agents are standing by.</p>
              <p>
                Our dedicated mortgage affiliates are vetted and work with the top banks in the
                country. Pre-approve your clients ahead of time before you submit an offer.
              </p>
              <input type="hidden" name="form-name" value={formName} />
              <input
                type="hidden"
                name="subject"
                value={`Mortgage Partner Interest: ${auth.firstName} ${auth.lastName}`}
              />
              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
              >
                Get Connected
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </MortgagePartnerWrapper>
  );
};

export default MortgagePartnerForm;
