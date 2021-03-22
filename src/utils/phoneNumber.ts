import StringMask from 'string-mask';

const phoneDelimiter = '-';
const phoneMask = '000-000-0000';
const removeTrailingCharIfFound = (str: string, char: string) =>
  str
    .split(char)
    .filter((segment) => segment !== '')
    .join(char);

export const formatPhoneNumberValue = (str: string) => {
  // remove +1 from cognito, and then remove any non-number character
  const sanitizedValue = str.replace('+1', '').replace(/\W/g, '');
  const unmaskedValue = sanitizedValue.split(phoneDelimiter).join('');
  const formatted = StringMask.process(unmaskedValue, phoneMask);
  return removeTrailingCharIfFound(formatted.result, phoneDelimiter);
};

export const reformattedPhoneForCognito = (num: string) => `+1${num.replace(/-/g, '')}`;

export const reformattedPhoneForFortis = (num: string) => num.replace('+1', '').replace(/-/g, '');
