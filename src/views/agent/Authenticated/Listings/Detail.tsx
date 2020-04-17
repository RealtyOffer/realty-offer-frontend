import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import { Box, Button, Heading, Input, Row, Column } from '../../../../components';
import { requiredCommissionAmount, requiredDollarAmount } from '../../../../utils/validations';
import { createAgentBid } from '../../../../redux/ducks/agent';

type DetailProps = {} & RouteComponentProps;

const ListingDetail: FunctionComponent<DetailProps> = (props) => {
  const dispatch = useDispatch();
  const isBuyer = props.location.state.type.toLowerCase().includes('buyer');
  const isSeller = props.location.state.type.toLowerCase().includes('seller');
  const initialValues = {
    sellerCommission: '',
    buyerCommission: '',
    sellingComplianceFee: '',
    closingCostsCommission: '',
    homeWarrantyAmount: '',
    homeInspectionAmount: '',
    preInspectionFee: '',
    buyingComplianceFee: '',
    listingId: props.location.state.id,
  };
  return (
    <Box>
      <Heading styledAs="title">
        {isBuyer &&
          `Buying for ${props.location?.state.buyingPriceRange} in ${Array.isArray(
            props.location.state.buyingCities
          ) &&
            props.location.state.buyingCities.length > 0 &&
            props.location.state.buyingCities.toString().replace(/,/g, ', ')}`}
        {isSeller && isBuyer && <br />}
        {isSeller &&
          `Selling for ${props.location?.state.sellersListingPriceInMind} in ${props.location.state.sellersCity}`}
      </Heading>
      <Heading as="h2" styledAs="subtitle">
        Additional Listing Information
      </Heading>
      <p>TODO: additional info goes here</p>
      <Heading as="h3" styledAs="title">
        Bid Details
      </Heading>
      <p>To increase your odds of winning this bid, you can provide additional funds.</p>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) =>
          dispatch(
            createAgentBid({
              sellerCommission: Number(values.sellerCommission) || undefined,
              buyerCommission: Number(values.buyerCommission) || undefined,
              sellingComplianceFee: Number(values.sellingComplianceFee) || undefined,
              closingCostsCommission: Number(values.closingCostsCommission) || undefined,
              homeWarrantyAmount: Number(values.homeWarrantyAmount) || undefined,
              homeInspectionAmount: Number(values.homeInspectionAmount) || undefined,
              preInspectionFee: Number(values.preInspectionFee) || undefined,
              buyingComplianceFee: Number(values.buyingComplianceFee) || undefined,
              listingId: props.location.state.id,
            })
          )
        }
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            {isSeller && (
              <>
                <Heading as="h4" styledAs="subtitle">
                  Home for Sale
                </Heading>
                <Row>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerCommission"
                      label="Seller Commission (%)"
                      validate={requiredCommissionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerCommission"
                      label="Buyer Commission (%)"
                      validate={requiredCommissionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellingComplianceFee"
                      label="Compliance Fee ($)"
                      validate={requiredDollarAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="preInspectionFee"
                      label="Pre-Inspection Fee ($)"
                      validate={requiredDollarAmount}
                    />
                  </Column>
                </Row>
              </>
            )}
            {isBuyer && (
              <>
                <Heading as="h4" styledAs="subtitle">
                  New Home Purchase
                </Heading>
                <Row>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="closingCostsCommission"
                      label="Commission towards closing costs (%)"
                      validate={requiredCommissionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="homeWarrantyAmount"
                      label="Home Warranty ($)"
                      validate={requiredDollarAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="homeInspectionAmount"
                      label="Home Inspection ($)"
                      validate={requiredDollarAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyingComplianceFee"
                      label="Compliance Fee ($)"
                      validate={requiredDollarAmount}
                    />
                  </Column>
                </Row>
              </>
            )}
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Place Bid
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ListingDetail;
