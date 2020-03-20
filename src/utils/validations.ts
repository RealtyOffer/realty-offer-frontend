// Formik doesn't allow multiple validation functions in its Field property `validate`, so
// we compose them using this function below
// from https://medium.com/@hasibsahibzada/formik-composed-field-level-validation-e40d6380b2d7
export const customFieldLevelValidation = (value: string, validations: Array<Function>) => {
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
export const requiredField = (value: string | Array<string>) => {
  if (Array.isArray(value) && value.length === 0) {
    return 'This field is required';
  }
  if (!value) {
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
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const isAlphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

const allowedSpecialCharacters = '!@#$%^&*()\\-_=+\\[{\\]}|;:\\\\\'",<.>/?`~';
const disallowedCharactersRegex = new RegExp(`[^A-Za-z\\d${allowedSpecialCharacters}]`, 'g');
const validPasswordRegex = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[${allowedSpecialCharacters}])[A-Za-z\\d${allowedSpecialCharacters}]{8,}$`,
  'g'
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

// composed validations for use in Formik Field components
export const requiredEmail = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isEmail]);

export const requiredPhoneNumber = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isPhoneNumber]);

export const requiredPassword = (value: string) =>
  customFieldLevelValidation(value, [requiredField, isValidPassword]);

export const passwordRulesString = `Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and a special character.`;
