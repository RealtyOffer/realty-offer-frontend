const numberWithCommas = (x: number) => {
  const parts = x
    .toFixed(2)
    .toString()
    .split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export default numberWithCommas;
