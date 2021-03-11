/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useLocation } from '@reach/router';
import { navigate, Link } from 'gatsby';
import { FaEnvelope, FaPhone, FaFileDownload, FaUser, FaClock } from 'react-icons/fa';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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
  Alert,
  Card,
  FlexContainer,
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
import { postSingleFortispayTransaction } from '../../../../redux/ducks/fortis';
import { FortispayTransactionResponseType } from '../../../../redux/ducks/fortis.d';
import { formatPhoneNumberValue } from '../../../../utils/phoneNumber';
import { ListingDetailsTable } from '../../../../components/ListingCard';
import { baseBorderStyle } from '../../../../styles/mixins';
import { baseSpacer, quadrupleSpacer } from '../../../../styles/size';
import useWindowSize from '../../../../utils/useWindowSize';
import { lightestGray } from '../../../../styles/color';

type ListingDetailsProps = {
  listingId?: string;
} & RouteComponentProps;

type ListingKeyType = 'new' | 'pending' | 'awarded' | 'history';

const ListingDetails: FunctionComponent<ListingDetailsProps> = (props) => {
  const listings = useSelector((state: RootState) => state.listings);
  const activeBid = useSelector((state: RootState) => state.agent.activeBid);
  const auth = useSelector((state: RootState) => state.auth);
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
  const isBuyerSeller = listing && listing.type === 'buyerSeller';

  const size = useWindowSize();

  const isNewOrPending = pathType === 'new' || pathType === 'pending';
  const isNewOrPendingAndNotExpired =
    isNewOrPending && listing && listing.createDateTime && !isExpired(listing.createDateTime);

  const isListingInSubscriptionArea =
    agent.cities?.some((city) => listing && listing.buyingCities?.some((c) => c.id === city.id)) ||
    agent.cities?.some((city) => listing && listing.sellersCity?.id === city.id);

  const isMonthlySubscriber =
    agent.cities && agent.cities.length > 0 && agent.fortispayRecurringId !== null;

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
    id: activeBid?.id,
    listingId: props.listingId,
    saveBidDetails: false,
  };

  const newInitialValues = {
    listingAgentCommission: '',
    buyersAgentCommission: '',
    sellerBrokerComplianceAmount:
      (agent.bidDefaults && agent.bidDefaults.sellerBrokerComplianceAmount) || '0',
    sellerPreInspectionAmount:
      (agent.bidDefaults && agent.bidDefaults.sellerPreInspectionAmount) || '0',
    sellerPreCertifyAmount: (agent.bidDefaults && agent.bidDefaults.sellerPreCertifyAmount) || '0',
    sellerMovingCompanyAmount:
      (agent.bidDefaults && agent.bidDefaults.sellerMovingCompanyAmount) || '0',
    sellerPhotographyAmount:
      (agent.bidDefaults && agent.bidDefaults.sellerPhotographyAmount) || '0',
    buyerCommission: '',
    buyerBrokerComplianceAmount:
      (agent.bidDefaults && agent.bidDefaults.buyerBrokerComplianceAmount) || '0',
    buyerInspectionAmount: (agent.bidDefaults && agent.bidDefaults.buyerInspectionAmount) || '0',
    buyerHomeWarrantyAmount:
      (agent.bidDefaults && agent.bidDefaults.buyerHomeWarrantyAmount) || '0',
    buyerAppraisalAmount: (agent.bidDefaults && agent.bidDefaults.buyerAppraisalAmount) || '0',
    buyerMovingCompanyAmount:
      (agent.bidDefaults && agent.bidDefaults.buyerMovingCompanyAmount) || '0',
    listingId: props.listingId,
    saveBidDetails: false,
  };

  useEffect(() => {
    if (listings[pathType as ListingKeyType] && listings[pathType as ListingKeyType].length === 0) {
      dispatch(getNewListings());
      dispatch(getPendingListings());
      dispatch(getAwardedListings());
      dispatch(getHistoryListings());
    }
  }, []);

  useEffect(() => {
    if (props.listingId && listing && listing.agentSubmittedBidId) {
      dispatch(getBidDetailsById(Number(listing.agentSubmittedBidId))).then(
        (response: ActionResponseType) => {
          if (
            response &&
            !response.error &&
            response.payload.id &&
            response.payload.agentCanViewContactInfo
          ) {
            return; // return out, no need to continue
          }
          if (
            response &&
            !response.error &&
            response.payload.id &&
            response.payload.winner &&
            !response.payload.agentCanViewContactInfo
          ) {
            // if a pilot user, they can view contact info without paying, OR
            // if a monthly subscriber and in the subscription area, update agentCanViewContactInfo
            if (agent.isPilotUser || (isMonthlySubscriber && isListingInSubscriptionArea)) {
              dispatch(
                updateAgentBid({
                  ...response.payload,
                  agentCanViewContactInfo: true,
                })
              ).then(() => {
                // refetch bid details to get consumer info
                dispatch(getBidDetailsById(Number(listing.agentSubmittedBidId)));
              });
              return;
            }
            // not in subscription area, or not a monthly subscriber, so pay the one time 295 fee
            // then update agentCanViewContactInfo
            // then get bid details again
            if ((isMonthlySubscriber && !isListingInSubscriptionArea) || !isMonthlySubscriber)
              dispatch(
                postSingleFortispayTransaction({
                  transaction_amount: 295,
                  account_vault_id: agent.fortispayAccountVaultId as string,
                })
              ).then((res: { payload: FortispayTransactionResponseType }) => {
                if (res && res.payload.status_id === 101) {
                  dispatch(
                    updateAgentBid({
                      ...activeBid,
                      agentCanViewContactInfo: true,
                    })
                  ).then(() => {
                    // refetch bid details to get consumer info
                    dispatch(getBidDetailsById(Number(listing.agentSubmittedBidId)));
                  });
                  return;
                }
                if (res && res.payload.status_id !== 101) {
                  dispatch(
                    addAlert({
                      type: 'danger',
                      message:
                        'Your payment has failed. Please try again, or update your payment method',
                    })
                  );
                }
              });
          }
        }
      );
    }
  }, []);

  const deleteBidAndNavigate = () => {
    if (activeBid && activeBid.id) {
      dispatch(deleteBidById(Number(activeBid.id))).then((response: ActionResponseType) => {
        if (response && !response.error) {
          if (window && window.analytics) {
            window.analytics.track('Agent deleted bid', {
              ...activeBid,
            });
          }
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

  const listingRef = useRef<HTMLDivElement>(null);

  const download = () => {
    if (listingRef.current) {
      html2canvas(listingRef.current, {
        backgroundColor: '#ffffff',
        scale: 0.6,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          unit: 'in',
        });
        pdf.text('RealtyOffer - Listing Details', 0.75, 0.75);
        pdf.addImage(imgData, 'PNG', 0.75, 1.5, 0, 0, '', undefined, 0);

        pdf.save('RealtyOffer-Agent-Contract.pdf');
      });

      // const doc = new jsPDF({
      //   unit: 'in',
      // });
      // doc.html(listing.current, {
      //   callback: (d) => d.save('my-listing'),
      //   margin: [0.75, 0.75, 0.75, 0.75],
      //   x: 0.75,
      //   y: 0.75,
      //   html2canvas: {
      //     width: 100,
      //   },
      // });
    }
  };

  if (listings[pathType as ListingKeyType] && listings[pathType as ListingKeyType].length === 0) {
    return <LoadingPage />;
  }

  if (!listing || !props.listingId) {
    if (window && window.analytics) {
      window.analytics.track('Listing not found', {
        route: window.location.pathname,
      });
    }
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
      <FlexContainer justifyContent="space-between">
        <p>
          <Link to={`/agent/listings/${pathType}`}>
            Back to {pathType.charAt(0).toUpperCase() + pathType.slice(1)} Listings
          </Link>
        </p>
        {activeBid?.consumer?.firstName &&
          listing &&
          activeBid.agentCanViewContactInfo &&
          activeBid.listingId === Number(props.listingId) && (
            <p>
              <Button onClick={() => download()} type="button" iconLeft={<FaFileDownload />}>
                Download PDF
              </Button>
            </p>
          )}
      </FlexContainer>
      <div ref={listingRef}>
        <Box>
          {activeBid?.consumer?.firstName &&
          listing &&
          activeBid.agentCanViewContactInfo &&
          activeBid.listingId === Number(props.listingId) ? (
            <>
              <Card
                fullWidth
                cardTitle="Consumer Contact Information"
                cardSubtitle={`Congrats on your new connection, now go help them ${
                  listing.type === 'buyerSeller' ? 'buy & sell' : listing.type?.replace('er', '')
                } a home!`}
              >
                <Row>
                  <Column xs={6} lg={3}>
                    <FlexContainer flexDirection="column">
                      <FaUser size={24} style={{ margin: 16 }} />
                      <Heading as="h4">
                        {activeBid.consumer.firstName} {activeBid.consumer.lastName}
                      </Heading>
                    </FlexContainer>
                  </Column>
                  <Column xs={6} lg={4}>
                    <FlexContainer flexDirection="column">
                      <FaEnvelope size={24} style={{ margin: 16 }} />
                      <a
                        href={`mailto:${activeBid.consumer.emailAddress}`}
                        style={{ wordBreak: 'break-all' }}
                      >
                        {activeBid.consumer.emailAddress}
                      </a>
                    </FlexContainer>
                  </Column>
                  <Column xs={6} lg={2}>
                    <FlexContainer flexDirection="column">
                      <FaPhone size={24} style={{ margin: 16 }} />
                      {activeBid.consumer.phoneNumber ? (
                        <a href={`tel:${activeBid.consumer.phoneNumber}`}>
                          {formatPhoneNumberValue(activeBid.consumer.phoneNumber)}
                        </a>
                      ) : (
                        'No phone number provided'
                      )}
                    </FlexContainer>
                  </Column>
                  <Column xs={6} lg={3}>
                    <FlexContainer flexDirection="column">
                      <FaClock size={24} style={{ margin: 16 }} />
                      <span>
                        Listing ended{' '}
                        {format(localizedCreateDateTime(listing.createDateTime), 'MM/dd/yyyy')}
                      </span>
                    </FlexContainer>
                  </Column>
                </Row>
              </Card>
              <HorizontalRule />
            </>
          ) : (
            <FlexContainer>
              {listing && listing.createDateTime && (
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
              )}
              <HorizontalRule />
            </FlexContainer>
          )}

          {!agent.isLoading &&
          listings[pathType as ListingKeyType] &&
          listings[pathType as ListingKeyType].length > 0 &&
          listing ? (
            <Formik
              validateOnMount
              initialValues={pathType === 'new' ? newInitialValues : existingBidInitialValues}
              onSubmit={(values) => {
                if (values.saveBidDetails) {
                  if (window && window.analytics) {
                    window.analytics.track('Agent saved bid defaults', {
                      user: auth.email,
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
                    });
                  }
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
                    : updateAgentBid({ ...formattedValues, id: agent.activeBid?.id })
                ).then((response: ActionResponseType) => {
                  if (response && !response.error) {
                    if (window && window.analytics) {
                      window.analytics.track(
                        pathType === 'new' ? 'Agent submitted bid' : 'Agent updated bid',
                        {
                          ...formattedValues,
                        }
                      );
                    }
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
                    navigate(
                      pathType === 'new' ? `/agent/listings/pending` : `/agent/listings/${pathType}`
                    );
                  }
                });
              }}
            >
              {({ isValid, isSubmitting, values }) => (
                <Form>
                  <Row>
                    {isSeller && (
                      <Column md={6} mdOffset={isBuyerSeller ? 0 : 3}>
                        <div style={{ padding: `0 ${size.isSmallScreen ? 0 : quadrupleSpacer}` }}>
                          <ListingDetailsTable>
                            <tbody>
                              <tr>
                                <td>Est. Listing Price:</td>
                                <td>
                                  {displayDropdownListText(
                                    listing.sellersListingPriceInMindPriceRangeInMindId,
                                    'priceRanges'
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Location:</td>
                                <td>{listing.sellersCity?.name}</td>
                              </tr>
                              <tr>
                                <td>Mortgage Balance:</td>
                                <td>
                                  {displayDropdownListText(
                                    listing.sellersMortgageBalanceId,
                                    'priceRanges'
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Timeline:</td>
                                <td>{listing.sellersTimeline}</td>
                              </tr>
                              <tr>
                                <td>Home Type:</td>
                                <td>
                                  {displayDropdownListText(listing.sellerTypeOfHomeId, 'homeTypes')}
                                </td>
                              </tr>
                            </tbody>
                          </ListingDetailsTable>
                          <br />
                          <br />
                          <Heading as="h4" styledAs="title">
                            Sell Bid Details
                          </Heading>
                          <HorizontalRule />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />
                        </div>
                      </Column>
                    )}

                    {isBuyer && (
                      <Column md={6} mdOffset={isBuyerSeller ? 0 : 3}>
                        <div
                          style={{
                            padding: `0 ${size.isSmallScreen ? 0 : quadrupleSpacer}`,
                            borderLeft:
                              isBuyerSeller && !size.isSmallScreen ? baseBorderStyle : 'none',
                            borderTop:
                              isBuyerSeller && size.isSmallScreen ? baseBorderStyle : 'none',
                            marginTop: isBuyerSeller && size.isSmallScreen ? quadrupleSpacer : 0,
                          }}
                        >
                          <ListingDetailsTable>
                            <tbody>
                              <tr>
                                <td>Est. Purchase Price:</td>
                                <td>
                                  {displayDropdownListText(
                                    listing.buyingPriceRangeId,
                                    'priceRanges'
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Location:</td>
                                <td>
                                  {Array.isArray(listing.buyingCities) &&
                                    listing.buyingCities.length > 0 &&
                                    Array(listing.buyingCities.map((city) => city.name))
                                      .toString()
                                      .replace(/,/g, ', ')}
                                </td>
                              </tr>
                              <tr>
                                <td>Home Type:</td>
                                <td>
                                  {displayDropdownListText(listing.buyerTypeOfHomeId, 'homeTypes')}
                                </td>
                              </tr>
                            </tbody>
                          </ListingDetailsTable>
                          <br />
                          <br />
                          <br />
                          <br />
                          <Heading as="h4" styledAs="title">
                            Purchase Bid Details
                          </Heading>
                          <HorizontalRule />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />

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
                            disabled={!isNewOrPendingAndNotExpired}
                          />
                          <br />
                          <br />
                        </div>
                      </Column>
                    )}
                  </Row>
                  <HorizontalRule />
                  <Row>
                    {isSeller && (
                      <Column md={6} mdOffset={isBuyerSeller ? 0 : 3}>
                        <Heading as="h5" align="center">
                          Total Sell Offering
                        </Heading>
                        <Heading as="h3" align="center">
                          {listing.sellersListingPriceInMindPriceRangeInMindId &&
                            `${sellTotal({
                              values,
                              priceRangeId: listing.sellersListingPriceInMindPriceRangeInMindId,
                              priceRangesList,
                            })}`}
                        </Heading>
                      </Column>
                    )}
                    {isBuyer && (
                      <Column md={6} mdOffset={isBuyerSeller ? 0 : 3}>
                        <Heading as="h5" align="center">
                          Total Purchase Offering
                        </Heading>
                        <Heading as="h3" align="center">
                          {listing.buyingPriceRangeId &&
                            `${buyTotal({
                              values,
                              priceRangeId: listing.buyingPriceRangeId,
                              priceRangesList,
                            })}`}
                        </Heading>
                      </Column>
                    )}
                  </Row>
                  {isNewOrPendingAndNotExpired && (
                    <div style={{ backgroundColor: lightestGray, padding: baseSpacer }}>
                      <Row>
                        <Column md={4} mdOffset={4}>
                          {agent.isInGoodStanding ? (
                            <>
                              <Button
                                type="submit"
                                disabled={
                                  !isValid || isSubmitting || isExpired(listing.createDateTime)
                                }
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
                                      <a
                                        href={agent.isPilotUser ? '/pilot-terms' : '/terms'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Terms of Use
                                      </a>
                                    </small>
                                  </div>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <Alert
                                type="danger"
                                message="You do not have a payment method on file, or your last payment failed. Please visit the"
                                callToActionLink="/agent/account/billing"
                                callToActionLinkText="Billing page to update your payment method"
                              />
                              <Button type="button" disabled block>
                                {pathType === 'new' ? 'Place bid' : 'Update Bid'}
                              </Button>
                            </>
                          )}
                        </Column>
                      </Row>
                    </div>
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
      </div>
    </>
  );
};

export default ListingDetails;
