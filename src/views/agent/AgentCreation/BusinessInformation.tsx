import React, { Component, Fragment } from 'react';
import uuidv4 from 'uuid/v4';
import { Formik, Field, Form } from 'formik';
import { navigate } from 'gatsby';
import {
  FaTrash, FaPlus, FaMapMarkerAlt, FaShoppingCart,
} from 'react-icons/fa';


import { RouteComponentProps } from '@reach/router';
import {
  Box, Button, Input, FlexContainer, Header, Row, Column, ProgressBar, HorizontalRule,
} from '../../../components';
import { requiredField } from '../../../utils/validations';
import { doubleSpacer } from '../../../styles/size';


interface BusinessInformationFormValues {
  zip: string;
  agentType: string;
  subscriptionType: string;
}

type BusinessInformationProps = {} & RouteComponentProps;

type BusinessInformationState = {
  regions: Array<BusinessInformationFormValues>,
  zips: Array<string>,
};

class BusinessInformation extends Component<BusinessInformationProps, BusinessInformationState> {
  constructor(props: BusinessInformationProps) {
    super(props);
    this.state = {
      regions: [],
      zips: [
        '48170 - Plymouth',
        '48152 - Livonia',
        '48154 - Livonia',
        '48150 - Livonia',
      ],
    };
  }

  submit = () => {
    // const { regions } = this.state;
    // console.log(regions);
    navigate('/agent/payment-information');
  }

  save = () => {
  }

  addToCart = (values: BusinessInformationFormValues) => {
    const nextZips = this.state.zips.filter((zip) => zip !== values.zip);

    this.setState((prevState: BusinessInformationState) => ({
      regions: [
        ...prevState.regions,
        values,
      ],
      zips: [
        ...nextZips,
      ],
    }));
  }

  buildZipOptions = () => (
    this.state.zips.map((zip) => (
      <option key={zip} value={zip}>{zip}</option>
    ))
  );

  removeFromCart = (index: number) => {
    this.setState((prevState: BusinessInformationState) => ({
      regions: [
        ...prevState.regions.slice(0, index),
        ...prevState.regions.slice(index + 1),
      ],
      zips: [
        ...prevState.zips,
        prevState.regions[index].zip,
      ],
    }));
  }

  render() {
    const { regions } = this.state;
    const initialValues = {
      zip: '',
      agentType: '',
      subscriptionType: '',
    };

    const noRegionsInCart = !Array.isArray(regions) || regions.length === 0;

    const getTotals = !noRegionsInCart && regions.map((r) => Number(r.subscriptionType))
      .reduce((total, amount) => total + amount);

    const numberWithCommas = (x: number) => {
      const parts = x.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    return (
      <Row>
        <Column md={8} mdOffset={2} lg={6} lgOffset={3}>
          <div>
            <Box largePadding>
              <FlexContainer flexDirection="column">
                <Header>Business Information</Header>
                <p>Select the zip codes you would like to receive leads in</p>
              </FlexContainer>
              <ProgressBar value={66} label="Step 2/3" name="progress" />
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  this.addToCart(values);
                  actions.resetForm();
                }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <Field
                      as={Input}
                      type="select"
                      name="zip"
                      label="Zip Code"
                      validate={requiredField}
                    >
                      <option value="">Select a Zip Code</option>
                      {this.buildZipOptions()}
                    </Field>
                    <Row>
                      <Column sm={6}>
                        <Field
                          as={Input}
                          type="select"
                          name="agentType"
                          label="Agent Type"
                          validate={requiredField}
                        >
                          <option value="">Select Agent Type</option>
                          <option value="Seller only">Seller only</option>
                          <option value="Seller &amp; Buyer">Seller &amp; Buyer</option>
                        </Field>
                      </Column>
                      <Column sm={6}>
                        <Field
                          as={Input}
                          type="select"
                          name="subscriptionType"
                          label="Subscription Type"
                          validate={requiredField}
                        >
                          <option value="">Select a Period</option>
                          <option value="199">Monthly ($199)</option>
                          <option value="2189">Yearly ($2,189)</option>
                        </Field>
                      </Column>
                    </Row>
                    <Button
                      type="submit"
                      iconLeft={<FaPlus />}
                      color="success"
                      disabled={isSubmitting || !isValid}
                    >
                      Add to Cart
                    </Button>

                    {
                      !noRegionsInCart && (
                        <FlexContainer justifyContent="space-between" alignItems="flex-end" height="100px">
                          <strong><FaMapMarkerAlt /> Zip Codes: {regions.length}</strong>
                          <strong>
                            <FaShoppingCart />Total: ${numberWithCommas(Number(getTotals))}
                          </strong>
                        </FlexContainer>
                      )
                    }

                    <HorizontalRule />
                    {
                      regions.map((r: BusinessInformationFormValues, index) => (
                        <Fragment key={uuidv4()}>
                          <FlexContainer justifyContent="space-between" height={doubleSpacer}>
                            <span>{r.zip}</span>
                            <span>{r.agentType}</span>
                            <span>${numberWithCommas(Number(r.subscriptionType))}</span>
                            <Button
                              type="button"
                              onClick={() => this.removeFromCart(index)}
                              iconLeft={<FaTrash />}
                              color="dangerOutline"
                            />
                          </FlexContainer>
                          <HorizontalRule />
                        </Fragment>
                      ))
                    }
                    <Button
                      type="button"
                      color="primary"
                      block
                      disabled={noRegionsInCart}
                      onClick={() => this.submit()}
                    >
                      Checkout
                    </Button>
                  </Form>
                )}
              </Formik>
              <Button type="button" onClick={() => this.save()} color="text" block>
                Save &amp; Complete Later
              </Button>
            </Box>
          </div>
        </Column>
      </Row>
    );
  }
}

export default BusinessInformation;
