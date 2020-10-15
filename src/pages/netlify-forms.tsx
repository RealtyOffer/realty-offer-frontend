/* eslint-disable no-console */
import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';

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
        <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="form-name" value="get-financed-form" />
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => console.log('hello')}>
      {() => (
        <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="form-name" value="missing-city" />
        </Form>
      )}
    </Formik>
    <Formik initialValues={{}} onSubmit={() => console.log('hello')}>
      {() => (
        <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="form-name" value="free-mortgage-consultation" />
        </Form>
      )}
    </Formik>
  </div>
);

export default NetlifyForms;
