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
import numberWithCommas from '../utils/numberWithCommas';

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
      <Box backgroundAccent>
        <Heading styledAs="title">Example Bid Scenario Calculator</Heading>
        <HorizontalRule />
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={(values) => {
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
                sellTotal: `$${numberWithCommas(sellTotal(values))}`,
                buyerCommission: `${values.buyerCommission}%`,
                buyerBrokerComplianceAmount: `$${values.buyerBrokerComplianceAmount}`,
                buyerInspectionAmount: `$${values.buyerInspectionAmount}`,
                buyerHomeWarrantyAmount: `$${values.buyerHomeWarrantyAmount}`,
                buyerAppraisalAmount: `$${values.buyerAppraisalAmount}`,
                buyerMovingCompanyAmount: `$${values.buyerMovingCompanyAmount}`,
                buyTotal: `$${numberWithCommas(buyTotal(values))}`,
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
          }}
        >
          {({ values, isSubmitting, isValid }) => (
            <Form name="bid-table" method="post" netlify-honeypot="bot-field" data-netlify="true">
              <input type="hidden" name="form-name" value="bid-table" />
              <Row>
                <Column md={6}>
                  <Heading>Selling</Heading>
                  <p>
                    Assuming a selling price at <strong>$300,000</strong>, enter values in the
                    following fields that would represent a competitive bid that you would make.
                  </p>
                  <Field
                    as={Input}
                    type="number"
                    name="sellerCommission"
                    label="Seller Commission"
                    helpText={helpTextSellerCommissionAmount}
                    validate={requiredSellerCommissionAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellerBrokerComplianceAmount"
                    label="Compliance Fee"
                    helpText={helpTextBrokerComplianceAmount}
                    validate={requiredBrokerComplianceAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellerPreInspectionAmount"
                    label="Pre Inspection Fee"
                    helpText={helpTextPreInspectionAmount}
                    validate={requiredPreInspectionAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellerPreCertifyAmount"
                    label="Pre Certification"
                    helpText={helpTextPreCertifyAmount}
                    validate={requiredPreCertifyAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellerMovingCompanyAmount"
                    label="Moving Costs"
                    helpText={helpTextMovingCompanyAmount}
                    validate={requiredMovingCompanyAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellerPhotographyAmount"
                    label="Photography"
                    helpText={helpTextPhotographyAmount}
                    validate={requiredPhotographyAmount}
                  />
                  <Heading as="h3">Total: ${numberWithCommas(sellTotal(values))}</Heading>
                </Column>
                <Column md={6}>
                  <Heading>Buying</Heading>
                  <p>
                    Assuming a buying price of <strong>$425,000</strong>, enter values in the
                    following fields that would represent a competitive bid that you would make.
                  </p>
                  <Field
                    as={Input}
                    type="number"
                    name="buyerCommission"
                    label="Buyer Commission Concession"
                    helpText={helpTextBuyerCommissionAmount}
                    validate={requiredBuyerCommissionAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyerBrokerComplianceAmount"
                    label="Compliance Fee"
                    helpText={helpTextBrokerComplianceAmount}
                    validate={requiredBrokerComplianceAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyerInspectionAmount"
                    label="Inspection"
                    helpText={helpTextInspectionAmount}
                    validate={requiredInspectionAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyerHomeWarrantyAmount"
                    label="Home Warranty"
                    helpText={helpTextHomeWarrantyAmount}
                    validate={requiredHomeWarrantyAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyerAppraisalAmount"
                    label="Appraisal"
                    helpText={helpTextAppraisalAmount}
                    validate={requiredAppraisalAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyerMovingCompanyAmount"
                    label="Moving Costs"
                    helpText={helpTextMovingCompanyAmount}
                    validate={requiredMovingCompanyAmount}
                  />
                  <Heading as="h3">Total: ${numberWithCommas(buyTotal(values))}</Heading>
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
