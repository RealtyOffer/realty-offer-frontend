export const formatCreditCardValue = (value: string) => {
  let trimmedCardNum = value.replace(/\s+/g, '');

  if (trimmedCardNum.length > 16) {
    trimmedCardNum = trimmedCardNum.substr(0, 16);
  }

  /* Handle American Express 4-6-5 spacing format */
  const partitions =
    trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37') ? [4, 6, 5] : [4, 4, 4, 4];

  const numbers: Array<string | number> = [];
  let position = 0;
  partitions.forEach((partition) => {
    const part = trimmedCardNum.substr(position, partition);
    if (part) numbers.push(part);
    position += partition;
  });

  const formattedCardNum = numbers.join(' ');

  return formattedCardNum;
};

export const unformattedCreditCardValue = (str: string | number) =>
  str.toString().replace(/\s/g, '');
