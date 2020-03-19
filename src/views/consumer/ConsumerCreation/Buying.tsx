import React, { FunctionComponent, useState } from 'react';
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
import {
  captureConsumerData,
  ConsumerStoreType,
} from '../../../redux/ducks/consumer';

import { requiredField } from '../../../utils/validations';
import priceRangesList from '../../../utils/priceRangesList';
import UnsavedChangesModal from './UnsavedChangesModal';

type BuyingFormValues = {
  buyingCity: string | Array<string>;
  buyingPriceRange: string;
  freeMortgageConsult: boolean;
  preApproved: boolean;
};

const citiesList = [
  { value: 'Plymouth', label: 'Plymouth' },
  { value: 'Livonia', label: 'Livonia' },
  { value: 'Canton', label: 'Canton' },
  { value: 'Northville', label: 'Northville' },
];

type BuyingProps = {
  actions: {
    captureConsumerData: Function;
  };
  consumer: ConsumerStoreType;
} & RouteComponentProps;

const Buying: FunctionComponent<BuyingProps> = props => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const initialValues: BuyingFormValues = {
    buyingCity: '',
    buyingPriceRange: '',
    freeMortgageConsult: false,
    preApproved: false,
  };

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Seo title="Buy A Home" />
      <Card
        cardTitle="Tell us about your move"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={values => {
              props.actions.captureConsumerData(values);
              navigate(
                props.consumer.signupData.consumerType === 'buyerSeller'
                  ? '/consumer/selling'
                  : '/consumer/special-requests',
              );
            }}
          >
            {({ values, isSubmitting, isValid, ...rest }) => (
              <Form>
                <Field
                  as={Input}
                  type="select"
                  isMulti
                  name="buyingCity"
                  options={citiesList}
                  label="What city/cities are you looking to move to?"
                  validate={requiredField}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="buyingPriceRange"
                  options={priceRangesList}
                  label="Do you have a purchase price in mind?"
                  validate={requiredField}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="checkbox"
                  checked={values.freeMortgageConsult}
                  name="freeMortgageConsult"
                  label="Would you like a free mortgage consultation?"
                />
                <Field
                  as={Input}
                  type="checkbox"
                  checked={values.preApproved}
                  name="preApproved"
                  label="Have you received a mortgage pre-approval?"
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
        </>
      </Card>
      <UnsavedChangesModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleUnsavedChangesModal}
        captureConsumerData={props.actions.captureConsumerData}
      />
    </>
  );
};

export default connect(
  state => ({
    consumer: (state as any).consumer,
  }),
  dispatch => ({
    actions: bindActionCreators({ captureConsumerData }, dispatch),
  }),
)(Buying);
