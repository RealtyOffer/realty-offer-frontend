import React, { FunctionComponent, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Card,
  Input,
  Seo,
  Column,
  Row,
  HorizontalRule,
  ProgressBar,
} from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';
import { RootState } from '../../../redux/ducks';

import languagesList from '../../../utils/languagesList';
import gendersList from '../../../utils/gendersList';
import UnsavedChangesModal from './UnsavedChangesModal';

type SpecialRequestsFormValues = {
  otherLanguage: string;
  genderPreference: string;
};

type SpecialRequestsProps = {} & RouteComponentProps;

const SpecialRequests: FunctionComponent<SpecialRequestsProps> = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const consumer = useSelector((state: RootState) => state.consumer);
  const dispatch = useDispatch();

  const initialValues: SpecialRequestsFormValues = {
    otherLanguage: 'No Preference',
    genderPreference: 'No Preference',
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const isBuyerAndSeller = consumer.signupData.consumerType === 'buyerSeller';

  return (
    <>
      <Seo title="Any Special Requests" />
      <Card
        cardTitle="Any Special Requests"
        cardSubtitle="Providing this additional information helps us match you with the best agent for you"
      >
        <ProgressBar
          value={isBuyerAndSeller ? 75 : 66}
          label={`Step ${isBuyerAndSeller ? 3 : 2}/${isBuyerAndSeller ? 4 : 3}`}
          name="progress"
        />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(captureConsumerData(values));
            navigate('/consumer/sign-up');
          }}
        >
          {({ isSubmitting, isValid, ...rest }) => (
            <Form>
              <Field
                as={Input}
                type="select"
                name="otherLanguage"
                label="Do you have a language preference other than English?"
                options={[...languagesList, { value: 'No Preference', label: 'No Preference' }]}
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
                    onClick={() => toggleUnsavedChangesModal()}
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
      <UnsavedChangesModal modalIsOpen={modalIsOpen} toggleModal={toggleUnsavedChangesModal} />
    </>
  );
};

export default SpecialRequests;
