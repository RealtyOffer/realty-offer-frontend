import { ListPayloadType } from '../redux/ducks/dropdowns.d';
import numberWithCommas from './numberWithCommas';

type CalculatorValuesType = {
  values: any;
  priceRangeId: number;
  priceRangesList: ListPayloadType;
};

const findMatchingRange = (priceRangeId: number, priceRangesList: ListPayloadType) => {
  const match = priceRangesList.find((i) => i.value === String(priceRangeId))?.text;
  return {
    low: Number(match?.slice(1, 8).replace(',', '')),
    high: Number(match?.slice(12, 20).replace(',', '')),
  };
};

const renderDollarAmount = (lowAndHighMatch: boolean, low: number, high: number) =>
  lowAndHighMatch
    ? `$${numberWithCommas(low)}`
    : `$${numberWithCommas(low)} - $${numberWithCommas(high)}`;

const calculatePercentage = (numerator: number, denominator: number) =>
  Number(Number((1 - (numerator - denominator) / numerator) * 100).toFixed(3));

const sorted = (low: number, high: number) => [low, high].sort((a, b) => a - b);

const renderPercentageAmount = (percentageMatch: boolean, low: number, high: number) =>
  percentageMatch ? `${low}%` : `${sorted(low, high)[0]}% - ${sorted(low, high)[1]}%`;

export const sellTotal = (payload: CalculatorValuesType) => {
  const matchingRange = findMatchingRange(payload.priceRangeId, payload.priceRangesList);
  const low =
    Number(payload.values.sellerCommission) * 0.01 * matchingRange?.low +
    Number(payload.values.sellerBrokerComplianceAmount) +
    -Number(payload.values.sellerPreInspectionAmount) +
    -Number(payload.values.sellerPreCertifyAmount) +
    -Number(payload.values.sellerMovingCompanyAmount) +
    -Number(payload.values.sellerPhotographyAmount);
  const high =
    Number(payload.values.sellerCommission) * 0.01 * matchingRange?.high +
    Number(payload.values.sellerBrokerComplianceAmount) +
    -Number(payload.values.sellerPreInspectionAmount) +
    -Number(payload.values.sellerPreCertifyAmount) +
    -Number(payload.values.sellerMovingCompanyAmount) +
    -Number(payload.values.sellerPhotographyAmount);

  const lowAndHighMatch = low === high;
  const percentageLow = calculatePercentage(matchingRange.low, sorted(low, high)[0]);
  const percentageHigh = calculatePercentage(matchingRange.high, sorted(low, high)[1]);
  const percentageMatch = percentageLow === percentageHigh;
  return `${renderDollarAmount(
    lowAndHighMatch,
    sorted(low, high)[0],
    sorted(low, high)[1]
  )} (${renderPercentageAmount(percentageMatch, percentageLow, percentageHigh)})`;
};

export const buyTotal = (payload: CalculatorValuesType) => {
  const matchingRange = findMatchingRange(payload.priceRangeId, payload.priceRangesList);
  const low =
    Number(payload.values.buyerCommission) * 0.01 * matchingRange?.low +
    -Number(payload.values.buyerBrokerComplianceAmount) +
    Number(payload.values.buyerInspectionAmount) +
    Number(payload.values.buyerHomeWarrantyAmount) +
    Number(payload.values.buyerAppraisalAmount) +
    Number(payload.values.buyerMovingCompanyAmount);
  const high =
    Number(payload.values.buyerCommission) * 0.01 * matchingRange?.high +
    -Number(payload.values.buyerBrokerComplianceAmount) +
    Number(payload.values.buyerInspectionAmount) +
    Number(payload.values.buyerHomeWarrantyAmount) +
    Number(payload.values.buyerAppraisalAmount) +
    Number(payload.values.buyerMovingCompanyAmount);

  const lowAndHighMatch = low === high;
  const percentageLow = calculatePercentage(matchingRange.low, sorted(low, high)[0]);
  const percentageHigh = calculatePercentage(matchingRange.high, sorted(low, high)[1]);
  const percentageMatch = percentageLow === percentageHigh;
  return `${renderDollarAmount(
    lowAndHighMatch,
    sorted(low, high)[0],
    sorted(low, high)[1]
  )} (${renderPercentageAmount(percentageMatch, percentageLow, percentageHigh)})`;
};
