import priceRangesList from './priceRangesList';
import numberWithCommas from './numberWithCommas';

type CalculatorValuesType = {
  values: any;
  priceRange: string;
};

const findMatchingRange = (priceRange: string) =>
  priceRangesList.find((i) => i.value === priceRange) || {
    low: 0,
    high: 0,
  };
const renderDollarAmount = (lowAndHighMatch: boolean, low: number, high: number) =>
  lowAndHighMatch
    ? `$${numberWithCommas(low)}`
    : `$${numberWithCommas(low)} - $${numberWithCommas(high)}`;

const calculatePercentage = (numerator: number, denominator: number) =>
  Number(Number((1 - (numerator - denominator) / numerator) * 100).toFixed(3));

const renderPercentageAmount = (percentageMatch: boolean, low: number, high: number) =>
  percentageMatch ? `${low}%` : `${low}% - ${high}%`;

const sorted = (low: number, high: number) => [low, high].sort((a, b) => a - b);

export const sellTotal = (payload: CalculatorValuesType) => {
  const matchingRange = findMatchingRange(payload.priceRange);
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
  const matchingRange = findMatchingRange(payload.priceRange);
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
