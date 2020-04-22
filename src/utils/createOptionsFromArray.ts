// Takes an array of objects and spits out a value/label object that react-select needs
// like { value: 'key', label: 'key' },
const createOptionsFromArray = (arr: Array<any>, key: string) =>
  arr.map((item) => {
    const obj = { value: '', label: '' };
    obj.value = item[key];
    obj.label = item[key];
    return obj;
  });

export default createOptionsFromArray;
