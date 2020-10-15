/* eslint-disable no-console */
import React, { FunctionComponent } from 'react';
import { Formik, Form } from 'formik';

import { Card, FlexContainer, Button } from '../components';

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
    <Formik initialValues={{}} onSubmit={() => console.log('hello')}>
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
            'city',
            'state',
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
    <Formik initialValues={{}} onSubmit={() => console.log('hello')}>
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
    <Formik initialValues={{}} onSubmit={() => console.log('hello')}>
      {() => (
        <Form
          name="free-mortgage-consultation"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="free-mortgage-consultation" />
          {[
            'type',
            'buyingCities',
            'buyingPriceRangeId',
            'createDateTime',
            'freeMortgageConsult',
            'preApproved',
            'sellersAddressLine1',
            'sellersAddressLine2',
            'sellersCity',
            'sellersZip',
            'sellersTimeline',
            'sellersListingPriceInMindPriceRangeInMindId',
            'sellersMortgageBalanceId',
            'agentSubmittedBidId',
            'buyerTypeOfHomeId',
            'sellerTypeOfHomeId',
            'city',
            'state',
            'buyingPriceRange',
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'subject',
          ].map((name) => (
            <input type="hidden" name={name} value="" key={name} />
          ))}
        </Form>
      )}
    </Formik>
  </div>
);

export default NetlifyForms;
