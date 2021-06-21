import React, { FunctionComponent, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { FaCaretRight, FaUndo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { Card, Button, Input, Seo, Alert, FlexContainer, PageContainer } from '../components';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';

import { RootState } from '../redux/ducks';
import { addAlert } from '../redux/ducks/globalAlerts';
import { requiredSelect } from '../utils/validations';

type FeedbackProps = {
  location?: {
    state: {
      pathname: string;
    };
  };
} & RouteComponentProps;

export const Feedback: FunctionComponent<FeedbackProps> = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [sent, setSent] = useState(false);

  const initialValues = {
    email: auth.email || '',
    name: `${auth.firstName} ${auth.lastName}` || '',
    page: props.location?.state?.pathname || '',
    areaOfSite: '',
    rating: '',
    experienceSoFar: '',
    improvements: '',
    message: '',
  };

  return (
    <PageContainer>
      <Seo
        title="Feedback"
        description="Provide our team with valuable feedback by filling out our form. Your feedback can help us improve our services and provide a better customer experience."
      />

      <Card
        cardTitle="Pilot Feedback"
        cardSubtitle="Thank you for taking the time to provide our team with valuable feedback."
      >
        {sent ? (
          <FlexContainer flexDirection="column">
            <Alert type="success" message="Thanks again, we really appreciate it!" />
            <Button type="link" to={props.location?.state?.pathname || '/'} iconLeft={<FaUndo />}>
              Go Back To Previous Page
            </Button>
          </FlexContainer>
        ) : (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              postFormUrlEncoded('feedback', values)
                .then(() => {
                  setSent(true);
                  setSubmitting(false);
                  resetForm();
                })
                .catch((err) => {
                  dispatch(
                    addAlert({
                      type: 'danger',
                      message: err.message,
                    })
                  );
                });
            }}
          >
            {({ isSubmitting, isValid, dirty, values, setFieldValue, ...rest }) => (
              <Form name="feedback" method="post" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="form-name" value="feedback" />
                <input type="hidden" name="email" value={values.email} />
                <input type="hidden" name="displayName" value={values.name} />
                <input type="hidden" name="page" value={values.page} />

                <Field
                  as={Input}
                  type="select"
                  name="areaOfSite"
                  required
                  label="Select the area of the site you'd like to leave feedback on"
                  options={[
                    { value: 'registration', label: 'Registration' },
                    { value: 'listings', label: 'Listing Pages' },
                    { value: 'bidding', label: 'Bidding Forms' },
                    { value: 'profile', label: 'My Profile' },
                    { value: 'billing', label: 'Billing' },
                  ]}
                  setFieldValue={setFieldValue}
                  validate={requiredSelect}
                  {...rest}
                />

                <Field
                  as={Input}
                  type="select"
                  name="experienceSoFar"
                  required
                  label="Please rate your experience so far"
                  options={[
                    { value: '5', label: '5 - Very Good' },
                    { value: '4', label: '4 - Good' },
                    { value: '3', label: '3 - So So' },
                    { value: '2', label: '2 - Bad' },
                    { value: '1', label: '1 - Very Bad' },
                  ]}
                  setFieldValue={setFieldValue}
                  validate={requiredSelect}
                  {...rest}
                />

                <Field
                  as={Input}
                  type="textarea"
                  name="differently"
                  label="Please describe your experience"
                  placeholder="In your own words, please describe your experience so far"
                />
                <Field
                  as={Input}
                  type="textarea"
                  name="improvements"
                  label="Possible Improvements"
                  placeholder="How can we make your experience more enjoyable?"
                />
                <Field as={Input} type="textarea" name="message" label="Any other feedback?" />
                <p>
                  <Button
                    type="submit"
                    iconRight={<FaCaretRight />}
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    Submit Feedback
                  </Button>
                  <Button
                    type="link"
                    to={props.location?.state?.pathname || '/'}
                    color="text"
                    iconLeft={<FaUndo />}
                  >
                    Cancel
                  </Button>
                </p>
              </Form>
            )}
          </Formik>
        )}
      </Card>
    </PageContainer>
  );
};

export default Feedback;
