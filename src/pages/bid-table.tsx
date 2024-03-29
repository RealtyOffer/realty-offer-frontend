import React, { FunctionComponent, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Box,
  HorizontalRule,
  Input,
  Row,
  Column,
  PageContainer,
  Heading,
  Seo,
} from '../components';
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
} from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import { buyTotal, sellTotal } from '../utils/buyingAndSellingCalculator';
import { RootState } from '../redux/ducks';
import { getPriceRangesList } from '../redux/ducks/dropdowns';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import trackEvent from '../utils/analytics';

type BidTableProps = {};

const BidTable: FunctionComponent<BidTableProps> = () => {
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);
  const dispatch = useDispatch();
  const initialValues = {
    listingAgentCommission: '',
    buyersAgentCommission: '',
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
    sellTotal: '',
    buyTotal: '',
    email: '',
  };

  useEffect(() => {
    dispatch(getPriceRangesList());
  }, []);

  return (
    <PageContainer>
      <Seo title="Example Bid Scenario Calculator" />
      <Box backgroundAccent>
        <Heading styledAs="title">Example Bid Scenario Calculator</Heading>
        <HorizontalRule />
        {priceRangesList.length > 0 ? (
          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              postFormUrlEncoded('bid-table', {
                listingAgentCommission: `${values.listingAgentCommission}%`,
                buyersAgentCommission: `${values.buyersAgentCommission}%`,
                sellerBrokerComplianceAmount: `$${values.sellerBrokerComplianceAmount}`,
                sellerPreInspectionAmount: `$${values.sellerPreInspectionAmount}`,
                sellerPreCertifyAmount: `$${values.sellerPreCertifyAmount}`,
                sellerMovingCompanyAmount: `$${values.sellerMovingCompanyAmount}`,
                sellerPhotographyAmount: `$${values.sellerPhotographyAmount}`,
                sellTotal: values.sellTotal,
                buyerCommission: `${values.buyerCommission}%`,
                buyerBrokerComplianceAmount: `$${values.buyerBrokerComplianceAmount}`,
                buyerInspectionAmount: `$${values.buyerInspectionAmount}`,
                buyerHomeWarrantyAmount: `$${values.buyerHomeWarrantyAmount}`,
                buyerAppraisalAmount: `$${values.buyerAppraisalAmount}`,
                buyerMovingCompanyAmount: `$${values.buyerMovingCompanyAmount}`,
                buyTotal: values.buyTotal,
                email: values.email,
              })
                .then(() => {
                  dispatch(
                    addAlert({
                      message: 'Thanks for your time! We appreciate your insights.',
                      type: 'success',
                    })
                  );

                  trackEvent(`Bid table completed`, {
                    ...values,
                  });
                })
                .catch(() => {
                  dispatch(
                    addAlert({
                      message: 'Something went wrong, please try again later.',
                      type: 'danger',
                    })
                  );

                  trackEvent(`Bid table failure`, {
                    ...values,
                  });
                })
                .finally(() => {
                  setSubmitting(false);
                  resetForm();
                });
            }}
          >
            {({ values, isSubmitting, isValid, setFieldValue }) => (
              <Form
                name="bid-table"
                method="post"
                netlify-honeypot="bot-field"
                data-netlify="true"
                onChange={() => {
                  setFieldValue(
                    'sellTotal',
                    sellTotal({
                      values,
                      priceRangeId: Number(priceRangesList[6].value),
                      priceRangesList,
                    })
                  );
                  setFieldValue(
                    'buyTotal',
                    buyTotal({
                      values,
                      priceRangeId: Number(priceRangesList[8].value),
                      priceRangesList,
                    })
                  );
                }}
              >
                <input type="hidden" name="form-name" value="bid-table" />
                <Row>
                  <Column md={6}>
                    <Heading>Selling</Heading>
                    <p>
                      Assuming a selling price of <strong>{priceRangesList[6].text}</strong>, enter
                      values in the following fields that would represent a competitive bid that you
                      would make.
                    </p>
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                    <Heading as="h3">
                      Total savings towards your closing costs and prepaid items:{' '}
                      {sellTotal({
                        values,
                        priceRangeId: Number(priceRangesList[6].value),
                        priceRangesList,
                      })}
                    </Heading>
                    <Field as={Input} type="hidden" name="sellTotal" label="Sell Total" />
                  </Column>
                  <Column md={6}>
                    <Heading>Buying</Heading>
                    <p>
                      Assuming a buying price of <strong>{priceRangesList[8].text}</strong>, enter
                      values in the following fields that would represent a competitive bid that you
                      would make.
                    </p>
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                    <Heading as="h3">
                      Total savings towards your closing costs and prepaid items:{' '}
                      {buyTotal({
                        values,
                        priceRangeId: Number(priceRangesList[8].value),
                        priceRangesList,
                      })}
                    </Heading>
                    <Field
                      as={Input}
                      type="hidden"
                      name="buyTotal"
                      label="Buy Total"
                      value={buyTotal({
                        values,
                        priceRangeId: Number(priceRangesList[8].value),
                        priceRangesList,
                      })}
                    />
                  </Column>
                </Row>
                <HorizontalRule />
                <Row>
                  <Column md={6}>
                    <Field as={Input} type="email" name="email" label="Your Email" />
                    <Button
                      type="submit"
                      block
                      iconRight={<FaCaretRight />}
                      disabled={isSubmitting || !isValid}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>
                  </Column>
                </Row>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Loading scenario...</p>
        )}
      </Box>
    </PageContainer>
  );
};

export default BidTable;
