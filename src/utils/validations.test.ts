import {
  customFieldLevelValidation,
  requiredField,
  isPhoneNumber,
  isEmail,
  isValidPassword,
} from './validations'

describe('validations', () => {
  it('should validate single validations', () => {
    expect(
      customFieldLevelValidation('existing value', [requiredField])
    ).toBeNull()
    expect(customFieldLevelValidation('', [requiredField])).toBeDefined()
    expect(customFieldLevelValidation('2203303330', [isPhoneNumber])).toBeNull()
    expect(customFieldLevelValidation('', [isPhoneNumber])).toBeDefined()
  })

  it('should validate multi-validations', () => {
    expect(
      customFieldLevelValidation('2203303330', [
        requiredField,
        isPhoneNumber,
        isEmail,
      ])
    ).toBeDefined()
    expect(
      customFieldLevelValidation('', [requiredField, isPhoneNumber, isEmail])
    ).toBeDefined()
    expect(
      customFieldLevelValidation('2203303330', [requiredField, isPhoneNumber])
    ).toBeNull()
  })

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
    expect(isPhoneNumber(value)).toEqual(expectedResult)
  })

  test.each([
    ['email@domain.tld', undefined],
    ['email@domainnotld', 'Invalid email address'],
    ['', undefined],
  ])('should validate email address %s', (value, expectedResult) => {
    expect(isEmail(value)).toEqual(expectedResult)
  })

  test.each([
    ['1234567', 'Password does not meet the requirements'],
    ['12345678', 'Password does not meet the requirements'],
    ['12345678Aa', 'Password does not meet the requirements'],
    ['12345678Aa!€', 'Password contains invalid character: €'],
    ['12345678Aa!', undefined],
    ['', undefined],
  ])('should validate password %s', (value, expectedResult) => {
    expect(isValidPassword(value)).toEqual(expectedResult)
  })
})
