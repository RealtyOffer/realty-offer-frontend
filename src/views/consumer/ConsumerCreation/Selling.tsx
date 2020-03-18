import React, { FunctionComponent, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Formik, Field, Form } from 'formik'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Button,
  Card,
  Input,
  Seo,
  Column,
  Row,
  HorizontalRule,
} from '../../../components'
import { captureConsumerData } from '../../../redux/ducks/consumer'

import { requiredField } from '../../../utils/validations'
import statesList from '../../../utils/statesList'
import priceRangesList from '../../../utils/priceRangesList'
import UnsavedChangesModal from './UnsavedChangesModal'

type SellingFormValues = {
  sellersAddressLine1: string
  sellersAddressLine2: string
  sellersCity: string
  sellersState: string
  sellersZip: string
  sellersTimeline: string
  selleresListingPriceInMind: string
  sellersMortgageBalance: string
}

const howSoonOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '3-6 months', label: '3-6 months' },
  { value: '6-12 months', label: '6-12 months' },
]

type SellingProps = {
  actions: {
    captureConsumerData: Function
  }
} & RouteComponentProps

const Selling: FunctionComponent<SellingProps> = props => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const initialValues: SellingFormValues = {
    sellersAddressLine1: '',
    sellersAddressLine2: '',
    sellersCity: '',
    sellersState: 'MI',
    sellersZip: '',
    sellersTimeline: '',
    selleresListingPriceInMind: '',
    sellersMortgageBalance: '',
  }

  const toggleUnsavedChangesModal = () => {
    setIsOpen(!modalIsOpen)
  }

  return (
    <>
      <Seo title="Sell Your Home" />
      <Card
        cardTitle="Tell us about your move"
        cardSubtitle="No contracts, no obligation, no awkward negotiations"
      >
        <>
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={values => {
              props.actions.captureConsumerData(values)
              navigate('/consumer/special-requests')
            }}
          >
            {({ values, isSubmitting, isValid, ...rest }) => (
              <Form>
                <Field
                  as={Input}
                  type="text"
                  name="sellersAddressLine1"
                  label="Address Line 1"
                  validate={requiredField}
                />
                <Field
                  as={Input}
                  type="text"
                  name="sellersAddressLine2"
                  label="Address Line 2"
                />
                <Field
                  as={Input}
                  type="text"
                  name="sellersCity"
                  label="City"
                  validate={requiredField}
                />
                <Row>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="select"
                      name="sellersState"
                      label="State"
                      disabled
                      validate={requiredField}
                      options={statesList}
                      {...rest}
                    />
                  </Column>
                  <Column xs={6}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellersZip"
                      label="Zip Code"
                      validate={requiredField}
                    />
                  </Column>
                </Row>
                <Field
                  as={Input}
                  type="select"
                  name="sellersTimeline"
                  label="How soon are you looking to sell your home?"
                  validate={requiredField}
                  options={howSoonOptions}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="selleresListingPriceInMind"
                  label="Do you have a listing price in mind?"
                  validate={requiredField}
                  options={priceRangesList}
                  {...rest}
                />
                <Field
                  as={Input}
                  type="select"
                  name="sellersMortgageBalance"
                  label="What is the estimated mortgage balance?"
                  validate={requiredField}
                  options={[
                    { value: 'Not sure', label: 'Not sure' },
                    {
                      value: 'Less than $100,000',
                      label: 'Less than $100,000',
                    },
                    ...priceRangesList,
                  ]}
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
        </>
      </Card>
      <UnsavedChangesModal
        modalIsOpen={modalIsOpen}
        toggleModal={toggleUnsavedChangesModal}
        captureConsumerData={props.actions.captureConsumerData}
      />
    </>
  )
}

export default connect(null, dispatch => ({
  actions: bindActionCreators({ captureConsumerData }, dispatch),
}))(Selling)
