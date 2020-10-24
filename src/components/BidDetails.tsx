import React from 'react';
import { useSelector } from 'react-redux';

import Column from './Column';
import Heading from './Heading';
import { buyTotal, sellTotal } from '../utils/buyingAndSellingCalculator';
import Row from './Row';

import { ListingType } from '../redux/ducks/listings.d';
import { BidType } from '../redux/ducks/agent.d';
import { RootState } from '../redux/ducks';

const BidDetails = ({ listing, bid }: { listing: ListingType; bid: BidType }) => {
  const priceRangesList = useSelector((state: RootState) => state.dropdowns.priceRanges.list);

  return (
    <Row>
      {listing.type?.toLowerCase().includes('seller') && bid && (
        <Column xs={6}>
          <dl>
            <dt>Listing Agent Commission</dt>
            <dd>{bid.listingAgentCommission}%</dd>
            <dt>Buying Agent Commission</dt>
            <dd>{bid.buyersAgentCommission}%</dd>
            {bid.sellerBrokerComplianceAmount && (
              <>
                <dt>Seller Compliance Fee</dt>
                <dd>${bid.sellerBrokerComplianceAmount}</dd>
              </>
            )}
            {bid.sellerPreInspectionAmount && (
              <>
                <dt>Seller Pre-Inspection</dt>
                <dd>${bid.sellerPreInspectionAmount}</dd>
              </>
            )}
            {bid.sellerPreCertifyAmount && (
              <>
                <dt>Seller Pre-Certification</dt>
                <dd>${bid.sellerPreCertifyAmount}</dd>
              </>
            )}
            {bid.sellerMovingCompanyAmount && (
              <>
                <dt>Seller Moving Costs</dt>
                <dd>${bid.sellerMovingCompanyAmount}</dd>
              </>
            )}
            {bid.sellerPhotographyAmount && (
              <>
                <dt>Seller Photography</dt>
                <dd>${bid.sellerPhotographyAmount}</dd>
              </>
            )}
          </dl>
          {bid.winner && <Heading as="h5">Selling Total Savings</Heading>}
          {!bid.winner && <dt>Selling Total Savings:</dt>}
          <dd>
            {sellTotal({
              values: bid,
              priceRangeId: Number(listing.sellersListingPriceInMindPriceRangeInMindId),
              priceRangesList,
            })}
          </dd>
        </Column>
      )}
      {listing.type?.includes('buyer') && bid && (
        <Column xs={6}>
          <dl>
            <dt>Total Buyer Commission</dt>
            <dd>{bid.buyerCommission}%</dd>
            {bid.buyerBrokerComplianceAmount && (
              <>
                <dt>Buyer Compliance Fee</dt>
                <dd>${bid.buyerBrokerComplianceAmount}</dd>
              </>
            )}
            {bid.buyerInspectionAmount && (
              <>
                <dt>Buyer Inspection</dt>
                <dd>${bid.buyerInspectionAmount}</dd>
              </>
            )}
            {bid.buyerHomeWarrantyAmount && (
              <>
                <dt>Buyer Home Warranty</dt>
                <dd>${bid.buyerHomeWarrantyAmount}</dd>
              </>
            )}
            {bid.buyerAppraisalAmount && (
              <>
                <dt>Buyer Appraisal</dt>
                <dd>${bid.buyerAppraisalAmount}</dd>
              </>
            )}
            {bid.buyerMovingCompanyAmount && (
              <>
                <dt>Buyer Moving Costs</dt>
                <dd>${bid.buyerMovingCompanyAmount}</dd>
              </>
            )}
          </dl>
          {bid.winner && <Heading as="h5">Buying Total Savings</Heading>}
          {!bid.winner && <dt>Buying Total Savings:</dt>}
          <dd>
            {buyTotal({
              values: bid,
              priceRangeId: Number(listing.buyingPriceRangeId),
              priceRangesList,
            })}
          </dd>
        </Column>
      )}
    </Row>
  );
};

BidDetails.displayName = 'BidDetails';

export default BidDetails;
