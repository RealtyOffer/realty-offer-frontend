export const sellTotal = (values: any) => {
  return (
    Number(values.sellerCommission) * 0.01 * 300000 +
    Number(values.sellerBrokerComplianceAmount) -
    Number(values.sellerPreInspectionAmount) -
    Number(values.sellerPreCertifyAmount) -
    Number(values.sellerMovingCompanyAmount) -
    Number(values.sellerPhotographyAmount)
  );
};

export const buyTotal = (values: any) => {
  return (
    Number(values.buyerCommission) * 0.01 * 425000 -
    Number(values.buyerBrokerComplianceAmount) +
    Number(values.buyerInspectionAmount) -
    Number(values.buyerHomeWarrantyAmount) +
    Number(values.buyerAppraisalAmount) -
    Number(values.buyerMovingCompanyAmount)
  );
};
