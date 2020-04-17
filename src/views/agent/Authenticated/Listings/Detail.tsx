import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';

import {
  Box,
  Button,
  Heading,
  Input,
  Row,
  Column,
  EmptyListingsView,
} from '../../../../components';
import { requiredCommissionAmount, requiredDollarAmount } from '../../../../utils/validations';
import { createAgentBid } from '../../../../redux/ducks/agent';
import { RootState } from '../../../../redux/ducks';
import { ListingType } from '../../../../redux/ducks/listings.d';

type DetailProps = {
  listingId?: string;
} & RouteComponentProps;

const ListingDetail: FunctionComponent<DetailProps> = (props) => {
  const listings = useSelector((state: RootState) => state.listings.listings);
  const dispatch = useDispatch();
  const listing = listings.find((l: ListingType) => String(l.id) === props.listingId);
  const isBuyer = listing && listing.type.toLowerCase().includes('buyer');
  const isSeller = listing && listing.type.toLowerCase().includes('seller');
  const initialValues = {
    sellerCommission: '',
    buyerCommission: '',
    sellingComplianceFee: '',
    closingCostsCommission: '',
    homeWarrantyAmount: '',
    homeInspectionAmount: '',
    preInspectionFee: '',
    buyingComplianceFee: '',
    listingId: props.listingId,
  };
  if (!listing || !props.listingId) {
    return (
      <EmptyListingsView
        title="Sorry, we couldn't find that listing. Please try again."
        buttonText="View New Listings"
        to="/agent/listings/new"
      />
    );
  }
  return (
    <Box>
      <Heading styledAs="title">
        {isBuyer &&
          `Buying for ${listing.buyingPriceRange} in ${Array.isArray(listing.buyingCities) &&
            listing.buyingCities.length > 0 &&
            listing.buyingCities.toString().replace(/,/g, ', ')}`}
        {isSeller && isBuyer && <br />}
        {isSeller && `Selling for ${listing.sellersListingPriceInMind} in ${listing.sellersCity}`}
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
        onSubmit={(values) => {
          dispatch(
            createAgentBid({
              // API requires numbers, Formik outputs strings so convert them here
              sellerCommission: Number(values.sellerCommission),
              buyerCommission: Number(values.buyerCommission),
              sellingComplianceFee: Number(values.sellingComplianceFee),
              closingCostsCommission: Number(values.closingCostsCommission),
              homeWarrantyAmount: Number(values.homeWarrantyAmount),
              homeInspectionAmount: Number(values.homeInspectionAmount),
              preInspectionFee: Number(values.preInspectionFee),
              buyingComplianceFee: Number(values.buyingComplianceFee),
              listingId: Number(props.listingId),
            })
          );
        }}
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
