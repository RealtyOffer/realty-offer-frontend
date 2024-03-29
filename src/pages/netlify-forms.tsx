/* eslint-disable no-console */
import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';

import { Card, FlexContainer, Button } from '../components';

//
// This file is so that Netlify can see some forms as HTML at build time,
// as it cannot "see" JS rendered forms. Make sure to add any fields to the arrays,
// and have the name, method, honeypot stuff on the Form tag for each to work.
// This only applies to Netlify Forms on pages behind Login, as any route in the
// `pages` directory gets statically generated by Gatsby
//

const NetlifyForms: FunctionComponent<{}> = () => (
  <div>
    <Card cardTitle="404: Page Not Found">
      <FlexContainer>
        <p>
          We could not find the page you were looking for. Please try again or visit the home page.
        </p>
        <Button type="link" to="/" color="primary">
          Home
        </Button>
      </FlexContainer>
    </Card>
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {() => (
        <Form
          name="get-financed-form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="get-financed-form" />
          {[
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'sellersCity',
            'buyingCities',
            'buyingPriceRange',
            'preApproved',
            'freeMortgageConsult',
            'subject',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {() => (
        <Form
          name="mortgage-partner-form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="mortgage-partner-form" />
          {[
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'subject',
            'brokerName',
            'brokerPhoneNumber',
            'brokerEmail',
            'brokerCity',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {() => (
        <Form name="missing-city" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="form-name" value="missing-city" />
          {[
            'firstName',
            'lastName',
            'phoneNumber',
            'email',
            'state',
            'zip',
            'buyingCities',
            'buyingPriceRange',
            'sellersAddressLine1',
            'sellersAddressLine2',
            'sellersCity',
            'sellersListingPriceInMind',
            'subject',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {() => (
        <Form
          name="new-consumer-account-created"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="new-consumer-account-created" />
          {[
            'type',
            'buyingCities',
            'buyingPriceRangeId',
            'freeMortgageConsult',
            'preApproved',
            'sellersAddressLine1',
            'sellersAddressLine2',
            'sellersCity',
            'sellersTimeline',
            'sellersListingPriceInMindPriceRangeInMindId',
            'sellersMortgageBalanceId',
            'buyerTypeOfHomeId',
            'sellerTypeOfHomeId',
            'buyingPriceRange',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'subject',
            'referralSource',
            'otherSource',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => undefined}>
      {() => (
        <Form
          name="new-agent-account-created"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="new-agent-account-created" />
          {[
            'subject',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'isPilotUser',
            'agentId',
            'brokerName',
            'brokerAddressLine1',
            'brokerAddressLine2',
            'brokerCity',
            'brokerZip',
            'brokerState',
            'brokerPhoneNumber',
            'brokerEmail',
            'subscriberType',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
  </div>
);

export default NetlifyForms;
