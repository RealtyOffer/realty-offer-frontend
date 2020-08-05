import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import { Link } from 'gatsby';

import {
  Box,
  Heading,
  Input,
  Row,
  Column,
  EmptyListingsView,
  HorizontalRule,
  LoadingPage,
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
import { getBidDetailsById } from '../../../../redux/ducks/agent';
import { RootState } from '../../../../redux/ducks';
import { buyTotal, sellTotal } from '../../../../utils/buyingAndSellingCalculator';
import { displayDropdownListText } from '../../../../utils/dropdownUtils';

type ArchivedListingDetailsProps = {
  listingId?: string;
  listingType?: 'awarded' | 'history';
} & RouteComponentProps;

const ArchivedListingDetails: FunctionComponent<ArchivedListingDetailsProps> = (props) => {
  const listings = useSelector((state: RootState) => state.listings);
  const agent = useSelector((state: RootState) => state.agent);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();
  const listing =
    props.listingType && listings[props.listingType].find((l) => String(l.id) === props.listingId);
  const isBuyer = listing && listing.type?.toLowerCase().includes('buyer');
  const isSeller = listing && listing.type?.toLowerCase().includes('seller');

  useEffect(() => {
    if (listing && listing.agentSubmittedBidId) {
      dispatch(getBidDetailsById(listing.agentSubmittedBidId));
    }
  }, []);

  if ((!listing || !props.listingId) && props.listingType) {
    return (
      <EmptyListingsView
        title="Sorry, we couldn't find that listing. Please try again."
        buttonText={`View ${props.listingType} Listings`}
        to={`/agent/listings/${props.listingType}`}
      />
    );
  }
  return (
    <Box>
      {props.listingType && (
        <Link to={`/agent/listings/${props.listingType}`}>
          Back to {props.listingType.charAt(0).toUpperCase() + props.listingType.slice(1)} Listings
        </Link>
      )}
      <Heading styledAs="title">
        {isBuyer &&
          listing &&
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
          listing &&
          `Selling for ${displayDropdownListText(
            listing.sellersListingPriceInMindPriceRangeInMindId,
            'priceRanges'
          )} in ${listing.sellersCity?.name}`}
      </Heading>
      <Heading as="h2" styledAs="subtitle">
        Additional Listing Information
      </Heading>
      <p>TODO: additional info goes here</p>
      <HorizontalRule />
      <Heading as="h3">Bid Details</Heading>
      {!agent.isLoading && agent.activeBid ? (
        <Formik validateOnMount initialValues={agent.activeBid} onSubmit={() => undefined}>
          {({ values }) => (
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </Column>
                  </Row>
                  <Heading as="h3">
                    {listing &&
                      listing.sellersListingPriceInMindPriceRangeInMindId &&
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </Column>
                  </Row>
                  <Heading as="h3">
                    {listing &&
                      listing.buyingPriceRangeId &&
                      `Total: ${buyTotal({
                        values,
                        priceRangeId: listing.buyingPriceRangeId,
                        priceRangesList,
                      })}`}
                  </Heading>
                </>
              )}
            </Form>
          )}
        </Formik>
      ) : (
        <LoadingPage />
      )}
    </Box>
  );
};

export default ArchivedListingDetails;
