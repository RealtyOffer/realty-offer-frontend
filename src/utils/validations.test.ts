import {
  customFieldLevelValidation,
  requiredField,
  requiredSelect,
  requiredSellerCommissionAmount,
  requiredBuyerCommissionAmount,
  requiredBrokerComplianceAmount,
  requiredDollarAmount,
  isPhoneNumber,
  isEmail,
  isValidPassword,
  isSellerCommissionAmount,
  isBuyerCommissionAmount,
  isBrokerComplianceAmount,
  isDollarAmount,
} from './validations';

describe('validations', () => {
  it('should validate single validations', () => {
    expect(customFieldLevelValidation('existing value', [requiredField])).toBeNull();
    expect(customFieldLevelValidation('   value with spaces', [requiredField])).toBeNull();
    expect(customFieldLevelValidation('   ', [requiredField])).toBeDefined();
    expect(customFieldLevelValidation('', [requiredField])).toBeDefined();
    expect(customFieldLevelValidation('2203303330', [isPhoneNumber])).toBeNull();
    expect(customFieldLevelValidation('', [isPhoneNumber])).toBeDefined();
    expect(customFieldLevelValidation(['Livonia', 'Plymouth'], [requiredSelect])).toBeNull();
    expect(customFieldLevelValidation('Livonia', [requiredSelect])).toBeNull();
    expect(customFieldLevelValidation('', [requiredSelect])).toBeDefined();
    expect(customFieldLevelValidation('2', [requiredSellerCommissionAmount])).toBeNull();
    expect(customFieldLevelValidation('8', [requiredSellerCommissionAmount])).toBeNull();
    expect(customFieldLevelValidation('1.9', [requiredSellerCommissionAmount])).toBeDefined();
    expect(customFieldLevelValidation('8.1', [requiredSellerCommissionAmount])).toBeDefined();
    expect(customFieldLevelValidation('0', [requiredBuyerCommissionAmount])).toBeNull();
    expect(customFieldLevelValidation('2', [requiredBuyerCommissionAmount])).toBeNull();
    expect(customFieldLevelValidation('-.1', [requiredBuyerCommissionAmount])).toBeDefined();
    expect(customFieldLevelValidation('2.1', [requiredBuyerCommissionAmount])).toBeDefined();
    expect(customFieldLevelValidation('0', [requiredBrokerComplianceAmount])).toBeNull();
    expect(customFieldLevelValidation('595', [requiredBrokerComplianceAmount])).toBeNull();
    expect(customFieldLevelValidation('-.1', [requiredBrokerComplianceAmount])).toBeDefined();
    expect(customFieldLevelValidation('596', [requiredBrokerComplianceAmount])).toBeDefined();
    expect(customFieldLevelValidation('1000.00', [requiredDollarAmount])).toBeNull();
    expect(customFieldLevelValidation('', [requiredDollarAmount])).toBeDefined();
  });

  it('should validate multi-validations', () => {
    expect(
      customFieldLevelValidation('2203303330', [requiredField, isPhoneNumber, isEmail])
    ).toBeDefined();
    expect(customFieldLevelValidation('', [requiredField, isPhoneNumber, isEmail])).toBeDefined();
    expect(customFieldLevelValidation('2203303330', [requiredField, isPhoneNumber])).toBeNull();
    expect(customFieldLevelValidation('2', [requiredField, isSellerCommissionAmount])).toBeNull();
    expect(
      customFieldLevelValidation('0.9', [requiredField, isSellerCommissionAmount])
    ).toBeDefined();
    expect(
      customFieldLevelValidation('4.1', [requiredField, isSellerCommissionAmount])
    ).toBeDefined();
    expect(customFieldLevelValidation('1', [requiredField, isBuyerCommissionAmount])).toBeNull();
    expect(
      customFieldLevelValidation('-.1', [requiredField, isBuyerCommissionAmount])
    ).toBeDefined();
    expect(
      customFieldLevelValidation('2.1', [requiredField, isBuyerCommissionAmount])
    ).toBeDefined();
    expect(customFieldLevelValidation('0', [requiredField, isBrokerComplianceAmount])).toBeNull();
    expect(
      customFieldLevelValidation('-.1', [requiredField, isBrokerComplianceAmount])
    ).toBeDefined();
    expect(
      customFieldLevelValidation('596', [requiredField, isBrokerComplianceAmount])
    ).toBeDefined();
    expect(customFieldLevelValidation('1000.00', [requiredField, isDollarAmount])).toBeNull();
    expect(customFieldLevelValidation('', [requiredField, isDollarAmount])).toBeDefined();
  });

  test.each([
    ['(123) 456-7890', undefined],
    ['(123)456-7890', undefined],
    ['123-456-7890', undefined],
    ['123.456.7890', undefined],
    ['1234567890', undefined],
    ['+31636363634', undefined],
    ['075-63546725', undefined],
    ['330907533', 'Invalid phone number, must be 10 digits'],
    ['', undefined],
  ])('should validate phone number %s', (value, expectedResult) => {
    expect(isPhoneNumber(value)).toEqual(expectedResult);
  });

  test.each([
    ['email@domain.tld', undefined],
    ['email@domainnotld', 'Invalid email address'],
    ['', undefined],
  ])('should validate email address %s', (value, expectedResult) => {
    expect(isEmail(value)).toEqual(expectedResult);
  });

  test.each([
    ['1234567', 'Password does not meet the requirements'],
    ['12345678', 'Password does not meet the requirements'],
    ['12345678Aa', 'Password does not meet the requirements'],
    ['12345678Aa!€', 'Password contains invalid character: €'],
    ['12345678Aa!', undefined],
    ['', undefined],
  ])('should validate password %s', (value, expectedResult) => {
    expect(isValidPassword(value)).toEqual(expectedResult);
  });
});
