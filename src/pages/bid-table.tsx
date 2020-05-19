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
import { requiredDollarAmount } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';

type BidTableProps = {};

const BidTable: FunctionComponent<BidTableProps> = () => {
  const dispatch = useDispatch();
  const initialValues = {
    sellCommission: '',
    sellBrokerComplianceFee: '',
    sellPreInspectionFee: '',
    sellPreCertifyFee: '',
    sellMovingCosts: '',
    sellPhotographyCosts: '',
    sellTotal: '',
    buyCommission: '',
    buyBrokerComplianceFee: '',
    buyInspectionFee: '',
    buyHomeWarranty: '',
    buyAppraisal: '',
    buyMovingCosts: '',
    buyTotal: '',
  };

  const encode = (data: { [key: string]: string | boolean }) => {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
  };

  const numberWithCommas = (x: number) => {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const sellTotal = (values: any) => {
    return (
      Number(values.sellCommission) * 0.01 * 300000 +
      Number(values.sellBrokerComplianceFee) -
      Number(values.sellPreInspectionFee) -
      Number(values.sellPreCertifyFee) -
      Number(values.sellMovingCosts) -
      Number(values.sellPhotographyCosts)
    );
  };

  const buyTotal = (values: any) => {
    return (
      Number(values.buyCommission) * 0.01 * 425000 -
      Number(values.buyBrokerComplianceFee) +
      Number(values.buyInspectionFee) -
      Number(values.buyHomeWarranty) +
      Number(values.buyMovingCosts) -
      Number(values.buyAppraisal)
    );
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
                sellCommission: `${values.sellCommission}%`,
                sellBrokerComplianceFee: `$${values.sellBrokerComplianceFee}`,
                sellPreInspectionFee: `$${values.sellPreInspectionFee}`,
                sellPreCertifyFee: `$${values.sellPreCertifyFee}`,
                sellMovingCosts: `$${values.sellMovingCosts}`,
                sellPhotographyCosts: `$${values.sellPhotographyCosts}`,
                sellTotal: `$${numberWithCommas(sellTotal(values))}`,
                buyCommission: `${values.buyCommission}%`,
                buyBrokerComplianceFee: `$${values.buyBrokerComplianceFee}`,
                buyInspectionFee: `$${values.buyInspectionFee}`,
                buyHomeWarranty: `$${values.buyHomeWarranty}`,
                buyAppraisal: `$${values.buyAppraisal}`,
                buyMovingCosts: `$${values.buyMovingCosts}`,
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
                    name="sellCommission"
                    label="Seller Commission"
                    helpText="Offer commission to sell 2% to 8%"
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellBrokerComplianceFee"
                    label="Compliance Fee"
                    helpText="Broker compliance fee $0 to $595"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellPreInspectionFee"
                    label="Pre Inspection Fee"
                    helpText="Offer to pay for a PRE home inspection fee $0 to $350"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellPreCertifyFee"
                    label="Pre Certification"
                    helpText="Offer to pay for home certification $0 to $250"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellMovingCosts"
                    label="Moving Costs"
                    helpText="Offer to pay for moving costs $0 to $1000"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="sellPhotographyCosts"
                    label="Photography"
                    helpText="Offer to pay photography $0 to $300"
                    validate={requiredDollarAmount}
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
                    name="buyCommission"
                    label="Buyer Commission Concession"
                    helpText="Offer Commission towards closing 0% to 2%"
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyBrokerComplianceFee"
                    label="Compliance Fee"
                    helpText="Broker compliance fee $0 to $595"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyInspectionFee"
                    label="Inspection Fee"
                    helpText="Offer to pay for home inspection fee $0 to $350"
                    validate={requiredDollarAmount}
                  />

                  <Field
                    as={Input}
                    type="number"
                    name="buyHomeWarranty"
                    label="Home Warranty"
                    helpText="Offer to pay for home warranty $0 to ???"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyAppraisal"
                    label="Appraisal"
                    helpText="Offer to pay for appraisal $0 to $800"
                    validate={requiredDollarAmount}
                  />
                  <Field
                    as={Input}
                    type="number"
                    name="buyMovingCosts"
                    label="Moving Costs"
                    helpText="Offer to pay for moving costs $0 to $1000"
                    validate={requiredDollarAmount}
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
