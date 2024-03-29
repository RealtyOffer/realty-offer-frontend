// Formik doesn't allow multiple validation functions in its Field property `validate`, so
// we compose them using this function below
// from https://medium.com/@hasibsahibzada/formik-composed-field-level-validation-e40d6380b2d7
export const customFieldLevelValidation = (
  value: string | Array<string>,
  validations: Array<Function>
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const validation of validations) {
    const result = validation(value);
    if (result) {
      return result;
    }
  }
  return null;
};

// individual validations
export const requiredField = (value: string) => {
  if (!value || String(value).trim() === '') {
    return 'This field is required';
  }
  return undefined;
};

export const requiredSelect = (value: Array<string> | string) => {
  // input type select can have multiple values as an array of strings, so check that first
  if (Array.isArray(value) && value.length === 0) {
    return 'This field is required';
  }
  // otherwise, for a single value it is just a string
  if ((value as string) === '') {
    return 'This field is required';
  }
  return undefined;
};

export const isPhoneNumber = (value: string) =>
  // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
  value && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const isEmail = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const isNumber = (value: string) =>
  // eslint-disable-next-line no-restricted-globals
  value && value !== '' && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const isDecimalNumer = (value: string) =>
  value && !/^(\d+\.?\d*|\.\d+)$/.test(value) ? 'Only numbers and decimal places' : undefined;

export const isAlphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

export const isNumbersAndSpacesOnly = (value: string) =>
  value && /[0-9 ]/i.test(value) ? 'Only numbers and spaces allowed' : undefined;

const allowedSpecialCharacters = '!@#$%^&*()\\-_=+\\[{\\]}|;:\\\\\'",<.>/?`~';
const disallowedCharactersRegex = new RegExp(`[^A-Za-z\\d${allowedSpecialCharacters}]`, 'g');
const validPasswordRegex = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${allowedSpecialCharacters}])[A-Za-z\\d${allowedSpecialCharacters}]{8,}$`
);
export const isValidPassword = (value: string) => {
  // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  // Minimum eight characters
  // one uppercase letter
  // one lowercase letter
  // one number
  // one special character

  // additionally, check if there are invalid characters to give a better error
  if (value && !validPasswordRegex.test(value)) {
    const invalidCharactersInPassword = value.match(disallowedCharactersRegex);
    if (invalidCharactersInPassword) {
      return `Password contains invalid character${
        invalidCharactersInPassword.length > 1 ? 's' : ''
      }: ${invalidCharactersInPassword
        .filter((a, b) => invalidCharactersInPassword.indexOf(a) === b)
        .join('')
        .replace(' ', '(space)')}`;
    }
    return 'Password does not meet the requirements';
  }
  return undefined;
};

export const isSixDigits = (value: string) => {
  if (String(value).length !== 6) {
    return 'Confirmation code must be 6 digits';
  }
  return undefined;
};

export const isListingAgentCommissionAmount = (value: string) => {
  if (Number(value) === 0) {
    return 'Commission must be above 1%';
  }
  if (value === '') {
    return 'This field is required';
  }
  if (value && Number(value) < 1) {
    return 'Commission must be above 1%';
  }
  if (value && Number(value) > 4) {
    return 'Commission must be below 4%';
  }
  return undefined;
};

export const isBuyersAgentCommissionAmount = (value: string) => {
  if (Number(value) === 0) {
    return 'Commission must be above 2%';
  }
  if (value === '') {
    return 'This field is required';
  }
  if (value && Number(value) < 2) {
    return 'Commission must be above 2%';
  }
  if (value && Number(value) > 4) {
    return 'Commission must be below 4%';
  }
  return undefined;
};

export const isBuyerCommissionAmount = (value: string) => {
  if (value === '') {
    return 'This field is required';
  }
  if (value && Number(value) < 0) {
    return 'Commission must be between 0% and 2%';
  }
  if (value && Number(value) > 2) {
    return 'Commission must be below 2%';
  }
  return undefined;
};

export const isBrokerComplianceAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 595)) {
    return 'Fee must be between $0 and $595';
  }
  return undefined;
};

export const isPreInspectionAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 350)) {
    return 'Amount must be between $0 and $350';
  }
  return undefined;
};

export const isPreCertifyAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 250)) {
    return 'Amount must be between $0 and $250';
  }
  return undefined;
};

export const isMovingCompanyAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 1000)) {
    return 'Amount must be between $0 and $1000';
  }
  return undefined;
};

export const isPhotographyAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 300)) {
    return 'Amount must be between $0 and $300';
  }
  return undefined;
};

export const isInspectionAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 500)) {
    return 'Amount must be between $0 and $500';
  }
  return undefined;
};

export const isHomeWarrantyAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 500)) {
    return 'Amount must be between $0 and $500';
  }
  return undefined;
};

export const isAppraisalAmount = (value: string) => {
  if ((value && Number(value) < 0) || (value && Number(value) > 800)) {
    return 'Amount must be between $0 and $800';
  }
  return undefined;
};

export const isDollarAmount = (value: string) => {
  const amountRegex = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
  if (value && !amountRegex.test(value)) {
    return 'Must be a valid dollar amount';
  }
  return undefined;
};

// composed validations for use in Formik Field components
export const requiredConfirmationCode = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isNumber, isSixDigits]);

export const requiredEmail = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isEmail]);

export const requiredPhoneNumber = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isPhoneNumber]);

export const requiredPassword = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isValidPassword]);

export const passwordRulesString = `Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and a special character.`;

export const requiredListingAgentCommissionAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isListingAgentCommissionAmount]);

export const requiredBuyersAgentCommissionAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isBuyersAgentCommissionAmount]);

export const requiredBuyerCommissionAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isBuyerCommissionAmount]);

export const requiredBrokerComplianceAmount = (value: string) =>
  customFieldLevelValidation(value, [
    isNumber,
    isDecimalNumer,
    isDollarAmount,
    isBrokerComplianceAmount,
  ]);

export const requiredPreInspectionAmount = (value: string) =>
  customFieldLevelValidation(value, [
    isNumber,
    isDecimalNumer,
    isDollarAmount,
    isPreInspectionAmount,
  ]);

export const requiredPreCertifyAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isDollarAmount, isPreCertifyAmount]);

export const requiredMovingCompanyAmount = (value: string) =>
  customFieldLevelValidation(value, [
    isNumber,
    isDecimalNumer,
    isDollarAmount,
    isMovingCompanyAmount,
  ]);

export const requiredPhotographyAmount = (value: string) =>
  customFieldLevelValidation(value, [
    isNumber,
    isDecimalNumer,
    isDollarAmount,
    isPhotographyAmount,
  ]);

export const requiredInspectionAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isDollarAmount, isInspectionAmount]);

export const requiredHomeWarrantyAmount = (value: string) =>
  customFieldLevelValidation(value, [
    isNumber,
    isDecimalNumer,
    isDollarAmount,
    isHomeWarrantyAmount,
  ]);

export const requiredAppraisalAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isDollarAmount, isAppraisalAmount]);

export const requiredDollarAmount = (value: string) =>
  customFieldLevelValidation(value, [isNumber, isDecimalNumer, isDollarAmount]);

export const helpTextListingAgentCommissionAmount = 'Offer commission to sell 1% to 4%';
export const helpTextBuyersAgentCommissionAmount = 'Offer commission to sell 2% to 4%';
export const helpTextBrokerComplianceAmount = 'Broker compliance fee $0 to $595';
export const helpTextPreInspectionAmount = 'Offer to pay for a pre-home inspection fee $0 to $350';
export const helpTextPreCertifyAmount = 'Offer to pay for home certification $0 to $250';
export const helpTextMovingCompanyAmount = 'Offer to pay for moving costs $0 to $1000';
export const helpTextPhotographyAmount = 'Offer to pay photography $0 to $300';
export const helpTextBuyerCommissionAmount = 'Offer Commission towards closing 0% to 2%';
export const helpTextInspectionAmount = 'Offer to pay for home inspection fee $0 to $500';
export const helpTextHomeWarrantyAmount = 'Offer to pay for home warranty $0 to $500';
export const helpTextAppraisalAmount = 'Offer to pay for appraisal $0 to $800';
