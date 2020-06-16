export default (array: Array<{}>, key: string) => {
  const uniqueArray: any[] = [];
  const map = new Map();

  array.forEach((item: any) => {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      uniqueArray.push(item);
    }
  });

  return uniqueArray;
};
