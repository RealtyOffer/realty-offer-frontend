import { PriceRangePayloadType } from '../redux/ducks/dropdowns.d';
import numberWithCommas from './numberWithCommas';

type CalculatorValuesType = {
  values: any;
  priceRangeId: number;
  priceRangesList: PriceRangePayloadType;
};

const findMatchingRange = (priceRangeId: number, priceRangesList: PriceRangePayloadType) => {
  const match = priceRangesList.find((i) => i.value === String(priceRangeId));
  return {
    min: match?.min ?? 0,
    max: match?.max ?? 0,
  };
};

const renderDollarAmountRange = (lowAndHighMatch: boolean, low: number, high: number) =>
  lowAndHighMatch
    ? `$${numberWithCommas(low)}`
    : `$${numberWithCommas(low)} - $${numberWithCommas(high)}`;

const calculatePercentage = (numerator: number, denominator: number) =>
  Number(Number((1 - (numerator - denominator) / numerator) * 100).toFixed(3));

const sorted = (low: number, high: number) => [low, high].sort((a, b) => a - b);

const renderPercentageAmountRange = (percentageMatch: boolean, low: number, high: number) =>
  percentageMatch ? `${low}%` : `${sorted(low, high)[0]}% - ${sorted(low, high)[1]}%`;

export const sellTotal = (payload: CalculatorValuesType) => {
  const matchingRange = findMatchingRange(payload.priceRangeId, payload.priceRangesList);
  const low =
    (Number(payload.values.listingAgentCommission) * 0.01 +
      Number(payload.values.buyersAgentCommission) * 0.01) *
      matchingRange?.min +
    Number(payload.values.sellerBrokerComplianceAmount) +
    -Number(payload.values.sellerPreInspectionAmount) +
    -Number(payload.values.sellerPreCertifyAmount) +
    -Number(payload.values.sellerMovingCompanyAmount) +
    -Number(payload.values.sellerPhotographyAmount);
  const high =
    (Number(payload.values.listingAgentCommission) * 0.01 +
      Number(payload.values.buyersAgentCommission) * 0.01) *
      matchingRange?.max +
    Number(payload.values.sellerBrokerComplianceAmount) +
    -Number(payload.values.sellerPreInspectionAmount) +
    -Number(payload.values.sellerPreCertifyAmount) +
    -Number(payload.values.sellerMovingCompanyAmount) +
    -Number(payload.values.sellerPhotographyAmount);

  const lowAndHighMatch = low === high;
  const percentageLow = calculatePercentage(matchingRange.min, sorted(low, high)[0]);
  const percentageHigh = calculatePercentage(matchingRange.max, sorted(low, high)[1]);
  const percentageMatch = percentageLow === percentageHigh;
  if (!matchingRange.min) {
    return `$${numberWithCommas(high)} (${calculatePercentage(matchingRange.max, high)}%) or less`;
  }
  if (!matchingRange.max) {
    return `$${numberWithCommas(low)} (${calculatePercentage(matchingRange.min, low)}%) or more`;
  }
  return `${renderDollarAmountRange(
    lowAndHighMatch,
    sorted(low, high)[0],
    sorted(low, high)[1]
  )} (${renderPercentageAmountRange(percentageMatch, percentageLow, percentageHigh)})`;
};

export const buyTotal = (payload: CalculatorValuesType) => {
  const matchingRange = findMatchingRange(payload.priceRangeId, payload.priceRangesList);
  const low =
    Number(payload.values.buyerCommission) * 0.01 * matchingRange?.min +
    -Number(payload.values.buyerBrokerComplianceAmount) +
    Number(payload.values.buyerInspectionAmount) +
    Number(payload.values.buyerHomeWarrantyAmount) +
    Number(payload.values.buyerAppraisalAmount) +
    Number(payload.values.buyerMovingCompanyAmount);
  const high =
    Number(payload.values.buyerCommission) * 0.01 * matchingRange?.max +
    -Number(payload.values.buyerBrokerComplianceAmount) +
    Number(payload.values.buyerInspectionAmount) +
    Number(payload.values.buyerHomeWarrantyAmount) +
    Number(payload.values.buyerAppraisalAmount) +
    Number(payload.values.buyerMovingCompanyAmount);

  const lowAndHighMatch = low === high;
  const percentageLow = calculatePercentage(matchingRange.min, sorted(low, high)[0]);
  const percentageHigh = calculatePercentage(matchingRange.max, sorted(low, high)[1]);
  const percentageMatch = percentageLow === percentageHigh;
  if (!matchingRange.min) {
    return `$${numberWithCommas(high)} (${calculatePercentage(matchingRange.max, high)}%) or less`;
  }
  if (!matchingRange.max) {
    return `$${numberWithCommas(low)} (${calculatePercentage(matchingRange.min, low)}%) or more`;
  }
  return `${renderDollarAmountRange(
    lowAndHighMatch,
    sorted(low, high)[0],
    sorted(low, high)[1]
  )} (${renderPercentageAmountRange(percentageMatch, percentageLow, percentageHigh)})`;
};
