import React, { FunctionComponent } from 'react';
import { Formik, Field, Form } from 'formik';
import { RouteComponentProps } from '@reach/router';

import { Box, Button, Heading, Input } from '../../../../components';

type DetailProps = {} & RouteComponentProps;

const ListingDetail: FunctionComponent<DetailProps> = () => {
  const initialValues = {
    sellerCommission: '',
    buyerCommission: '',
    sellersComplianceFee: '',
    closingCostsCommission: '',
    homeWarranty: '',
    homeInspection: '',
    preInspectionFee: '',
    buyersComplianceFee: '',
  };
  return (
    <Box>
      <Heading>$350-375k</Heading>
      <Heading as="h3">Additional Listing Information</Heading>
      <p>more info here</p>
      <Heading as="h3">Bid Details</Heading>
      <p>To increase your odds of winning this bid, you can provide additional funds.</p>
      <Formik
        validateOnMount
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <Heading as="h4">Home for Sale</Heading>
            <Field as={Input} type="number" name="sellerCommission" label="Seller Commission" />
            <Field as={Input} type="number" name="buyerCommission" label="Buyer Commission" />
            <Field as={Input} type="number" name="sellersComplianceFee" label="Compliance Fee" />
            <Heading as="h4">New Home Purchase</Heading>
            <Field
              as={Input}
              type="number"
              name="closingCostsCommission"
              label="Commission towards closing costs"
            />
            <Field as={Input} type="number" name="homeWarranty" label="Home Warranty" />
            <Field as={Input} type="number" name="homeInspection" label="Home Inspection" />
            <Field as={Input} type="number" name="preInspectionFee" label="Pre-Inspection Fee" />
            <Field as={Input} type="number" name="buyersComplianceFee" label="Compliance Fee" />
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
