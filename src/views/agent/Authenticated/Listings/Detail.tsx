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
  HorizontalRule,
} from '../../../../components';
import {
  requiredSellerCommissionAmount,
  requiredBrokerComplianceAmount,
  requiredPreInspectionAmount,
  requiredPreCertifyAmount,
  requiredPhotographyAmount,
  requiredBuyerCommissionAmount,
  requiredInspectionAmount,
  requiredHomeWarrantyAmount,
  requiredMovingCompanyAmount,
  requiredAppraisalAmount,
  helpTextAppraisalAmount,
  helpTextBrokerComplianceAmount,
  helpTextInspectionAmount,
  helpTextHomeWarrantyAmount,
  helpTextBuyerCommissionAmount,
  helpTextPhotographyAmount,
  helpTextMovingCompanyAmount,
  helpTextPreCertifyAmount,
  helpTextPreInspectionAmount,
  helpTextSellerCommissionAmount,
} from '../../../../utils/validations';
import { createAgentBid } from '../../../../redux/ducks/agent';
import { RootState } from '../../../../redux/ducks';
import { ListingType } from '../../../../redux/ducks/listings.d';
import { buyTotal, sellTotal } from '../../../../utils/buyingAndSellingCalculator';

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
    sellerBrokerComplianceAmount: '',
    sellerPreInspectionAmount: '',
    sellerPreCertifyAmount: '',
    sellerMovingCompanyAmount: '',
    sellerPhotographyAmount: '',
    buyerCommission: '',
    buyerBrokerComplianceAmount: '',
    buyerInspectionAmount: '',
    buyerHomeWarrantyAmount: '',
    buyerAppraisalAmount: '',
    buyerMovingCompanyAmount: '',
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
            Array(listing.buyingCities.map((city) => city.name))
              .toString()
              .replace(/,/g, ', ')}`}
        {isSeller && isBuyer && <br />}
        {isSeller &&
          `Selling for ${listing.sellersListingPriceInMind} in ${listing.sellersCity?.name}`}
      </Heading>
      <Heading as="h2" styledAs="subtitle">
        Additional Listing Information
      </Heading>
      <p>TODO: additional info goes here</p>
      <HorizontalRule />
      <Heading as="h3">Bid Details</Heading>
      <p>To increase your odds of winning this bid, you can provide additional funds.</p>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(
            createAgentBid({
              // API requires numbers, Formik outputs strings so convert them here
              sellerCommission: Number(values.sellerCommission),
              sellerBrokerComplianceAmount: Number(values.sellerBrokerComplianceAmount),
              sellerPreInspectionAmount: Number(values.sellerPreInspectionAmount),
              sellerPreCertifyAmount: Number(values.sellerPreCertifyAmount),
              sellerMovingCompanyAmount: Number(values.sellerMovingCompanyAmount),
              sellerPhotographyAmount: Number(values.sellerPhotographyAmount),
              buyerCommission: Number(values.buyerCommission),
              buyerBrokerComplianceAmount: Number(values.buyerBrokerComplianceAmount),
              buyerInspectionAmount: Number(values.buyerInspectionAmount),
              buyerHomeWarrantyAmount: Number(values.buyerHomeWarrantyAmount),
              buyerAppraisalAmount: Number(values.buyerAppraisalAmount),
              buyerMovingCompanyAmount: Number(values.buyerMovingCompanyAmount),
              listingId: Number(props.listingId),
            })
          );
        }}
      >
        {({ isValid, isSubmitting, values }) => (
          <Form>
            {isSeller && (
              <>
                <Heading as="h4">Home for Sale</Heading>
                <Row>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerCommission"
                      label="Seller Commission (%)"
                      step={0.001}
                      min={2}
                      max={8}
                      helpText={helpTextSellerCommissionAmount}
                      validate={requiredSellerCommissionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerBrokerComplianceAmount"
                      label="Seller Compliance Fee ($)"
                      step={0.01}
                      min={0}
                      max={595}
                      helpText={helpTextBrokerComplianceAmount}
                      validate={requiredBrokerComplianceAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerPreInspectionAmount"
                      label="Seller Pre Inspection ($)"
                      step={0.01}
                      min={0}
                      max={350}
                      helpText={helpTextPreInspectionAmount}
                      validate={requiredPreInspectionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerPreCertifyAmount"
                      label="Seller Pre Certification ($)"
                      step={0.01}
                      min={0}
                      max={250}
                      helpText={helpTextPreCertifyAmount}
                      validate={requiredPreCertifyAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerMovingCompanyAmount"
                      label="Seller Moving Costs ($)"
                      step={0.01}
                      min={0}
                      max={1000}
                      helpText={helpTextMovingCompanyAmount}
                      validate={requiredMovingCompanyAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="sellerPhotographyAmount"
                      label="Seller Photography ($)"
                      step={0.01}
                      min={0}
                      max={300}
                      helpText={helpTextPhotographyAmount}
                      validate={requiredPhotographyAmount}
                    />
                  </Column>
                </Row>
                <Heading as="h3">
                  {listing.sellersListingPriceInMind &&
                    `Total: ${sellTotal({
                      values,
                      priceRange: listing.sellersListingPriceInMind,
                    })}`}
                </Heading>
              </>
            )}
            {isSeller && isBuyer && <HorizontalRule />}
            {isBuyer && (
              <>
                <Heading as="h4">New Home Purchase</Heading>
                <Row>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      step={0.001}
                      min={0}
                      max={2}
                      name="buyerCommission"
                      label="Buyer Commission Concession (%)"
                      helpText={helpTextBuyerCommissionAmount}
                      validate={requiredBuyerCommissionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerBrokerComplianceAmount"
                      label="Buyer Compliance Fee ($)"
                      step={0.01}
                      min={0}
                      max={595}
                      helpText={helpTextBrokerComplianceAmount}
                      validate={requiredBrokerComplianceAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerInspectionAmount"
                      label="Buyer Inspection ($)"
                      step={0.01}
                      min={0}
                      max={500}
                      helpText={helpTextInspectionAmount}
                      validate={requiredInspectionAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerHomeWarrantyAmount"
                      label="Buyer Home Warranty ($)"
                      step={0.01}
                      min={0}
                      max={500}
                      helpText={helpTextHomeWarrantyAmount}
                      validate={requiredHomeWarrantyAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerAppraisalAmount"
                      label="Buyer Appraisal ($)"
                      step={0.01}
                      min={0}
                      max={800}
                      helpText={helpTextAppraisalAmount}
                      validate={requiredAppraisalAmount}
                    />
                  </Column>
                  <Column md={4}>
                    <Field
                      as={Input}
                      type="number"
                      name="buyerMovingCompanyAmount"
                      label="Buyer Moving Costs ($)"
                      step={0.01}
                      min={0}
                      max={1000}
                      helpText={helpTextMovingCompanyAmount}
                      validate={requiredMovingCompanyAmount}
                    />
                  </Column>
                </Row>
                <Heading as="h3">
                  {listing.buyingPriceRange &&
                    `Total: ${buyTotal({ values, priceRange: listing.buyingPriceRange })}`}
                </Heading>
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
