import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button,
  Card,
  Input,
  Seo,
  Column,
  Row,
  HorizontalRule,
} from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';

import languagesList from '../../../utils/languagesList';
import gendersList from '../../../utils/gendersList';

type SpecialRequestsFormValues = {
  otherLanguage: string;
  genderPreference: string;
}

type SpecialRequestsProps = {
  actions: {
    captureConsumerData: Function;
  }
} & RouteComponentProps

const SpecialRequests: FunctionComponent<SpecialRequestsProps> = (props) => {
  const initialValues: SpecialRequestsFormValues = {
    otherLanguage: 'No Preference',
    genderPreference: 'No Preference',
  };

  const areYouSure = () => { };

  return (
    <>
      <Seo title="Any Special Requests" />
      <Card
        cardTitle="Any Special Requests"
        cardSubtitle="Providing this additional information helps us match you with the best agent for you"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            props.actions.captureConsumerData(values);
            navigate('/consumer/sign-up');
          }}
        >
          {({
            values, isSubmitting, isValid, ...rest
          }) => (
            <Form>
              <Field
                as={Input}
                type="select"
                name="otherLanguage"
                label="Do you have a language preference other than English?"
                options={languagesList}
                {...rest}
              />
              <Field
                as={Input}
                type="select"
                name="genderPreference"
                label="Agent Gender Preference"
                options={gendersList}
                {...rest}
              />
              <HorizontalRule />
              <Row>
                <Column xs={6}>
                  <Button
                    type="button"
                    onClick={() => areYouSure()}
                    block
                    color="primaryOutline"
                    iconLeft={<FaCaretLeft />}
                  >
                    Back
                  </Button>
                </Column>
                <Column xs={6}>
                  <Button
                    type="submit"
                    block
                    iconRight={<FaCaretRight />}
                    disabled={isSubmitting || !isValid}
                  >
                    Next
                  </Button>
                </Column>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default connect(
  null,
  (dispatch) => ({
    actions: bindActionCreators({ captureConsumerData }, dispatch),
  }),
)(SpecialRequests);
