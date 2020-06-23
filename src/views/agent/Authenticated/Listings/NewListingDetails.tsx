import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { navigate, Link } from 'gatsby';

import {
  Box,
  Button,
  Heading,
  Input,
  Row,
  Column,
  EmptyListingsView,
  HorizontalRule,
  Countdown,
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
import { addAlert } from '../../../../redux/ducks/globalAlerts';
import { buyTotal, sellTotal } from '../../../../utils/buyingAndSellingCalculator';
import displayDropdownListText from '../../../../utils/displayDropdownListText';
import { ActionResponseType } from '../../../../redux/constants';

type ListingDetailsProps = {
  listingId?: string;
} & RouteComponentProps;

const NewListingDetails: FunctionComponent<ListingDetailsProps> = (props) => {
  const listings = useSelector((state: RootState) => state.listings);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();
  const listing = listings.new.find((l) => String(l.id) === props.listingId);
  const isBuyer = listing && listing.type?.toLowerCase().includes('buyer');
  const isSeller = listing && listing.type?.toLowerCase().includes('seller');
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
      <Link to="/agent/listings/new">Back to New Listings</Link>
      <Heading styledAs="title">
        {isBuyer &&
          `Buying for ${displayDropdownListText(
            listing.buyingPriceRangeId,
            'priceRanges'
          )} in ${Array.isArray(listing.buyingCities) &&
            listing.buyingCities.length > 0 &&
            Array(listing.buyingCities.map((city) => city.name))
              .toString()
              .replace(/,/g, ', ')}`}
        {isSeller && isBuyer && <br />}
        {isSeller &&
          `Selling for ${displayDropdownListText(
            listing.sellersListingPriceInMindPriceRangeInMindId,
            'priceRanges'
          )} in ${listing.sellersCity?.name}`}
      </Heading>
      <Heading as="h2" styledAs="subtitle">
        Additional Listing Information
      </Heading>
      <Countdown createDateTime={listing.createDateTime} />
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
          ).then((response: ActionResponseType) => {
            if (response && !response.error) {
              dispatch(
                addAlert({
                  message: 'Successfully submitted bid',
                  type: 'success',
                })
              );
              navigate('/agent/listings/new');
            }
          });
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </Column>
                </Row>
                <Heading as="h3">
                  {listing.sellersListingPriceInMindPriceRangeInMindId &&
                    `Total: ${sellTotal({
                      values,
                      priceRangeId: listing.sellersListingPriceInMindPriceRangeInMindId,
                      priceRangesList,
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </Column>
                </Row>
                <Heading as="h3">
                  {listing.buyingPriceRangeId &&
                    `Total: ${buyTotal({
                      values,
                      priceRangeId: listing.buyingPriceRangeId,
                      priceRangesList,
                    })}`}
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

export default NewListingDetails;
