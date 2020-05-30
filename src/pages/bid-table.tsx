import React, { FunctionComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import { FaCaretRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

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
} from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import { buyTotal, sellTotal } from '../utils/buyingAndSellingCalculator';
import priceRangesList from '../utils/priceRangesList';

type BidTableProps = {};

const BidTable: FunctionComponent<BidTableProps> = () => {
  const dispatch = useDispatch();
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
    sellTotal: '',
    buyTotal: '',
  };

  const encode = (data: { [key: string]: string | boolean }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  return (
    <PageContainer>
      <Seo title="Example Bid Scenario Calculator" />
      <Box backgroundAccent>
        <Heading styledAs="title">Example Bid Scenario Calculator</Heading>
        <HorizontalRule />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            fetch('https://realtyoffer.com/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: encode({
                'form-name': 'bid-table',
                sellerCommission: `${values.sellerCommission}%`,
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
              }),
            })
              .then(() => {
                dispatch(
                  addAlert({
                    message: 'Thanks for your time! We appreciate your insights.',
                    type: 'success',
                  })
                );
              })
              .catch(() => {
                dispatch(
                  addAlert({
                    message: 'Something went wrong, please try again later.',
                    type: 'danger',
                  })
                );
              });
            setSubmitting(false);
            resetForm();
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
                  sellTotal({ values, priceRange: priceRangesList[4].value })
                );
                setFieldValue(
                  'buyTotal',
                  buyTotal({ values, priceRange: priceRangesList[6].value })
                );
              }}
            >
              <input type="hidden" name="form-name" value="bid-table" />
              <Row>
                <Column md={6}>
                  <Heading>Selling</Heading>
                  <p>
                    Assuming a selling price at <strong>{priceRangesList[4].value}</strong>, enter
                    values in the following fields that would represent a competitive bid that you
                    would make.
                  </p>
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
                  <Heading as="h3">
                    Total: {sellTotal({ values, priceRange: priceRangesList[4].value })}
                  </Heading>
                  <Field as={Input} type="hidden" name="sellTotal" label="Sell Total" />
                </Column>
                <Column md={6}>
                  <Heading>Buying</Heading>
                  <p>
                    Assuming a buying price of <strong>{priceRangesList[6].value}</strong>, enter
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
                    label="Buyer Commission Concession (%)"
                    helpText={helpTextBuyerCommissionAmount}
                    validate={requiredBuyerCommissionAmount}
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
                  />
                  <Heading as="h3">
                    Total: {buyTotal({ values, priceRange: priceRangesList[6].value })}
                  </Heading>
                  <Field
                    as={Input}
                    type="hidden"
                    name="buyTotal"
                    label="Buy Total"
                    value={buyTotal({ values, priceRange: priceRangesList[6].value })}
                  />
                </Column>
              </Row>
              <HorizontalRule />
              <Button
                type="submit"
                block
                iconRight={<FaCaretRight />}
                disabled={isSubmitting || !isValid}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </PageContainer>
  );
};

export default BidTable;
