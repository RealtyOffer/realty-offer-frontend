import React, { FunctionComponent, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from '@reach/router';
import { navigate, Link } from 'gatsby';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { format } from 'date-fns';

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
  Modal,
  LoadingPage,
} from '../../../../components';
import {
  requiredListingAgentCommissionAmount,
  requiredBuyersAgentCommissionAmount,
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
  helpTextListingAgentCommissionAmount,
  helpTextBuyersAgentCommissionAmount,
} from '../../../../utils/validations';
import {
  createAgentBid,
  getBidDetailsById,
  deleteBidById,
  updateAgentBid,
  updateAgentProfile,
} from '../../../../redux/ducks/agent';
import { RootState } from '../../../../redux/ducks';
import { addAlert } from '../../../../redux/ducks/globalAlerts';
import { buyTotal, sellTotal } from '../../../../utils/buyingAndSellingCalculator';
import { displayDropdownListText } from '../../../../utils/dropdownUtils';
import { ActionResponseType } from '../../../../redux/constants';
import { isExpired, localizedCreateDateTime } from '../../../../utils/countdownTimerUtils';
import {
  getNewListings,
  getPendingListings,
  getAwardedListings,
  getHistoryListings,
} from '../../../../redux/ducks/listings';

type ListingDetailsProps = {
  listingId?: string;
} & RouteComponentProps;

type ListingKeyType = 'new' | 'pending' | 'awarded' | 'history';

const ListingDetails: FunctionComponent<ListingDetailsProps> = (props) => {
  const listings = useSelector((state: RootState) => state.listings);
  const activeBid = useSelector((state: RootState) => state.agent.activeBid);
  const agent = useSelector((state: RootState) => state.agent);
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathType = location.pathname.split('/')[3];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const listing = listings[pathType as ListingKeyType].find(
    (l) => String(l.id) === props.listingId
  )!;

  const isBuyer = listing && listing.type?.toLowerCase().includes('buyer');
  const isSeller = listing && listing.type?.toLowerCase().includes('seller');

  const isNewOrPending = pathType === 'new' || pathType === 'pending';

  const existingBidInitialValues = {
    listingAgentCommission: activeBid ? String(activeBid.listingAgentCommission) : '',
    buyersAgentCommission: activeBid ? String(activeBid.buyersAgentCommission) : '',
    sellerBrokerComplianceAmount: activeBid ? String(activeBid.sellerBrokerComplianceAmount) : '0',
    sellerPreInspectionAmount: activeBid ? String(activeBid.sellerPreInspectionAmount) : '0',
    sellerPreCertifyAmount: activeBid ? String(activeBid.sellerPreCertifyAmount) : '0',
    sellerMovingCompanyAmount: activeBid ? String(activeBid.sellerMovingCompanyAmount) : '0',
    sellerPhotographyAmount: activeBid ? String(activeBid.sellerPhotographyAmount) : '0',
    buyerCommission: activeBid ? String(activeBid.buyerCommission) : '',
    buyerBrokerComplianceAmount: activeBid ? String(activeBid.buyerBrokerComplianceAmount) : '0',
    buyerInspectionAmount: activeBid ? String(activeBid.buyerInspectionAmount) : '0',
    buyerHomeWarrantyAmount: activeBid ? String(activeBid.buyerHomeWarrantyAmount) : '0',
    buyerAppraisalAmount: activeBid ? String(activeBid.buyerAppraisalAmount) : '0',
    buyerMovingCompanyAmount: activeBid ? String(activeBid.buyerMovingCompanyAmount) : '0',
    listingId: props.listingId,
    saveBidDetails: false,
  };

  const newInitialValues = {
    listingAgentCommission: '',
    buyersAgentCommission: '',
    sellerBrokerComplianceAmount: agent.bidDefaults.sellerBrokerComplianceAmount || '0',
    sellerPreInspectionAmount: agent.bidDefaults.sellerPreInspectionAmount || '0',
    sellerPreCertifyAmount: agent.bidDefaults.sellerPreCertifyAmount || '0',
    sellerMovingCompanyAmount: agent.bidDefaults.sellerMovingCompanyAmount || '0',
    sellerPhotographyAmount: agent.bidDefaults.sellerPhotographyAmount || '0',
    buyerCommission: '',
    buyerBrokerComplianceAmount: agent.bidDefaults.buyerBrokerComplianceAmount || '0',
    buyerInspectionAmount: agent.bidDefaults.buyerInspectionAmount || '0',
    buyerHomeWarrantyAmount: agent.bidDefaults.buyerHomeWarrantyAmount || '0',
    buyerAppraisalAmount: agent.bidDefaults.buyerAppraisalAmount || '0',
    buyerMovingCompanyAmount: agent.bidDefaults.buyerMovingCompanyAmount || '0',
    listingId: props.listingId,
    saveBidDetails: false,
  };

  useEffect(() => {
    if (props.listingId && listing && listing.agentSubmittedBidId) {
      dispatch(getBidDetailsById(Number(listing.agentSubmittedBidId)));
    }
  }, [dispatch, listing, props.listingId]);

  const deleteBidAndNavigate = () => {
    if (activeBid && activeBid.id) {
      dispatch(deleteBidById(Number(activeBid.id))).then((response: ActionResponseType) => {
        if (response && !response.error) {
          addAlert({
            type: 'success',
            message: 'Successfully removed your bid',
          });
          navigate('/agent/listings/pending');
          dispatch(getNewListings());
          dispatch(getPendingListings());
          dispatch(getAwardedListings());
          dispatch(getHistoryListings());
        }
      });
    }
  };

  if (!listing || !props.listingId) {
    return (
      <EmptyListingsView
        title="Sorry, we couldn't find that listing. Please try again."
        buttonText={`View ${pathType.charAt(0).toUpperCase() + pathType.slice(1)} Listings`}
        to={`/agent/listings/${pathType}`}
      />
    );
  }
  return (
    <>
      <p>
        <Link to={`/agent/listings/${pathType}`}>
          Back to {pathType.charAt(0).toUpperCase() + pathType.slice(1)} Listings
        </Link>
      </p>
      <Box>
        {activeBid?.consumer?.firstName && listing ? (
          <>
            <Row>
              <Column sm={3}>
                <Heading as="h4" noMargin>
                  {activeBid.consumer.firstName} {activeBid.consumer.lastName}
                </Heading>
              </Column>
              <Column sm={3}>
                <FaEnvelope />{' '}
                <a href={`mailto:${activeBid.consumer.emailAddress}`}>
                  {activeBid.consumer.emailAddress}
                </a>
              </Column>
              <Column sm={3}>
                <FaPhone />{' '}
                <a href={`tel:${activeBid.consumer.phoneNumber}`}>
                  {activeBid.consumer.phoneNumber}
                </a>
              </Column>
              <Column sm={3}>
                Listing ended{' '}
                {format(localizedCreateDateTime(listing.createDateTime), 'MM/dd/yyyy')}
              </Column>
            </Row>
            <HorizontalRule />
          </>
        ) : (
          <>
            <Countdown
              createDateTime={listing.createDateTime}
              showRemainingTimeString
              onComplete={() =>
                dispatch(
                  addAlert({
                    type: 'info',
                    message: 'The bidding window for this listing has just ended.',
                  })
                )
              }
            />
            <HorizontalRule />
          </>
        )}

        {!agent.isLoading && !agent.activeBid?.isLoading && agent.activeBid?.id && listing ? (
          <Formik
            validateOnMount
            initialValues={pathType === 'new' ? newInitialValues : existingBidInitialValues}
            onSubmit={(values) => {
              if (values.saveBidDetails) {
                dispatch(
                  updateAgentProfile({
                    ...agent,
                    bidDefaults: {
                      sellerBrokerComplianceAmount: Number(values.sellerBrokerComplianceAmount),
                      buyerHomeWarrantyAmount: Number(values.buyerHomeWarrantyAmount),
                      buyerInspectionAmount: Number(values.buyerInspectionAmount),
                      sellerPreInspectionAmount: Number(values.sellerPreInspectionAmount),
                      buyerBrokerComplianceAmount: Number(values.buyerBrokerComplianceAmount),
                      sellerPreCertifyAmount: Number(values.sellerPreCertifyAmount),
                      sellerMovingCompanyAmount: Number(values.sellerMovingCompanyAmount),
                      sellerPhotographyAmount: Number(values.sellerPhotographyAmount),
                      buyerAppraisalAmount: Number(values.buyerAppraisalAmount),
                      buyerMovingCompanyAmount: Number(values.buyerMovingCompanyAmount),
                    },
                  })
                );
              }
              // API requires numbers, Formik outputs strings so convert them here
              const formattedValues = {
                listingAgentCommission: Number(values.listingAgentCommission),
                buyersAgentCommission: Number(values.buyersAgentCommission),
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
              };
              dispatch(
                pathType === 'new'
                  ? createAgentBid({ ...formattedValues })
                  : updateAgentBid({ ...formattedValues })
              ).then((response: ActionResponseType) => {
                if (response && !response.error) {
                  dispatch(
                    addAlert({
                      message:
                        pathType === 'new'
                          ? 'Successfully submitted bid'
                          : 'Successfully updated bid',
                      type: 'success',
                    })
                  );
                  dispatch(getNewListings());
                  dispatch(getPendingListings());
                  dispatch(getAwardedListings());
                  dispatch(getHistoryListings());
                  navigate(`/agent/listings/${pathType}`);
                }
              });
            }}
          >
            {({ isValid, isSubmitting, values }) => (
              <Form>
                <Row>
                  {isSeller && (
                    <Column md={6}>
                      <Row>
                        <Column xs={6}>
                          <Heading as="h3" noMargin>
                            Est. Listing Price:
                          </Heading>
                        </Column>
                        <Column xs={6}>
                          <Heading as="h3" noMargin>
                            {displayDropdownListText(
                              listing.sellersListingPriceInMindPriceRangeInMindId,
                              'priceRanges'
                            )}
                          </Heading>
                        </Column>
                        <Column xs={6}>
                          <strong>Location:</strong>
                        </Column>
                        <Column xs={6}>{listing.sellersCity?.name}</Column>
                        <Column xs={6}>
                          <strong>Home Type:</strong>
                        </Column>
                        <Column xs={6}>
                          {displayDropdownListText(listing.sellerTypeOfHomeId, 'homeTypes')}
                        </Column>
                        <Column xs={6}>
                          <strong>Timeline:</strong>
                        </Column>
                        <Column xs={6}>{listing.sellersTimeline}</Column>
                      </Row>
                      <HorizontalRule />
                      <Heading as="h4">Sell Bid Details</Heading>
                      <Row>
                        <Column md={6}>
                          <Field
                            as={Input}
                            type="number"
                            name="listingAgentCommission"
                            label="Total Listing Agent Commission (%)"
                            step={0.001}
                            min={1}
                            max={4}
                            helpText={helpTextListingAgentCommissionAmount}
                            validate={requiredListingAgentCommissionAmount}
                            required
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
                          <Field
                            as={Input}
                            type="number"
                            name="buyersAgentCommission"
                            label="Total Buyer's Agent Commission (%)"
                            step={0.001}
                            min={2}
                            max={4}
                            helpText={helpTextBuyersAgentCommissionAmount}
                            validate={requiredBuyersAgentCommissionAmount}
                            required
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
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
                    </Column>
                  )}

                  {isBuyer && (
                    <Column md={6}>
                      <Row>
                        <Column xs={6}>
                          <Heading as="h3" noMargin>
                            Est. Purchase Price:
                          </Heading>
                        </Column>
                        <Column xs={6}>
                          <Heading as="h3" noMargin>
                            {displayDropdownListText(listing.buyingPriceRangeId, 'priceRanges')}
                          </Heading>
                        </Column>
                        <Column xs={6}>
                          <strong>Location:</strong>
                        </Column>
                        <Column xs={6}>
                          {Array.isArray(listing.buyingCities) &&
                            listing.buyingCities.length > 0 &&
                            Array(listing.buyingCities.map((city) => city.name))
                              .toString()
                              .replace(/,/g, ', ')}
                        </Column>
                        <Column xs={6}>
                          <strong>Home Type:</strong>
                        </Column>
                        <Column xs={6}>
                          {displayDropdownListText(listing.buyerTypeOfHomeId, 'homeTypes')}
                        </Column>
                        <Column xs={6}>
                          <strong>&nbsp;</strong>
                        </Column>
                        <Column xs={6}>&nbsp;</Column>
                      </Row>
                      <HorizontalRule />
                      <Heading as="h4">Purchase Bid Details</Heading>
                      <Row>
                        <Column md={6}>
                          <Field
                            as={Input}
                            type="number"
                            step={0.001}
                            min={0}
                            max={2}
                            name="buyerCommission"
                            label="Total Buyer Commission Contribution Towards Closing Costs (%)"
                            helpText={helpTextBuyerCommissionAmount}
                            validate={requiredBuyerCommissionAmount}
                            required
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
                          />
                        </Column>
                        <Column md={6}>
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
                            disabled={!isNewOrPending}
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
                    </Column>
                  )}
                </Row>
                {isNewOrPending && (
                  <Row>
                    <Column md={6} mdOffset={3}>
                      <Button
                        type="submit"
                        disabled={!isValid || isSubmitting || isExpired(listing.createDateTime)}
                        isLoading={isSubmitting || agent.isLoading}
                        rightspacer={pathType === 'pending'}
                        block
                      >
                        {pathType === 'new' ? 'Place bid' : 'Update Bid'}
                      </Button>
                      {pathType === 'pending' && (
                        <>
                          <br />
                          <br />
                          <Button
                            type="button"
                            onClick={() => setModalIsOpen(!modalIsOpen)}
                            color="danger"
                            block
                          >
                            Remove My Bid
                          </Button>
                        </>
                      )}
                      {pathType === 'new' && (
                        <>
                          <br />
                          <br />
                          <Field
                            as={Input}
                            type="checkbox"
                            name="saveBidDetails"
                            checked={values.saveBidDetails}
                            label="Save my details for my next bid"
                          />
                          <div>
                            <small>
                              By clicking &quot;Place Bid&quot;, I agree to the{' '}
                              <a href="/terms" target="_blank">
                                Terms &amp; Conditions
                              </a>
                            </small>
                          </div>
                        </>
                      )}
                    </Column>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        ) : (
          <LoadingPage />
        )}
        {pathType === 'pending' && (
          <Modal toggleModal={() => false} isOpen={modalIsOpen}>
            <Heading styledAs="title">Delete Bid?</Heading>
            <p>Are you sure you want to delete your bid on this listing?</p>
            <Row>
              <Column xs={6}>
                <Button
                  type="button"
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                  color="primaryOutline"
                  block
                >
                  No, Keep Bid
                </Button>
              </Column>
              <Column xs={6}>
                <Button
                  type="button"
                  onClick={() => deleteBidAndNavigate()}
                  block
                  color="danger"
                  isLoading={agent.isLoading}
                >
                  Yes, Delete Bid
                </Button>
              </Column>
            </Row>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default ListingDetails;
