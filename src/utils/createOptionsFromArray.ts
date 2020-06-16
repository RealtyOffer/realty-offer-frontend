import { ListPayloadType } from '../redux/ducks/dropdowns.d';

// Takes an array of objects and spits out a value/label object that react-select needs
// like { value: 'key', label: 'key' },
export const createOptionsFromArray = (arr: Array<any>, key: string) =>
  arr.map((item) => {
    const obj = { value: '', label: '' };
    obj.value = item[key];
    obj.label = item[key];
    return obj;
  });

// takes an arr in the shape of ListPayloadType and uses the text key for the label
export const createOptionsFromManagedDropdownList = (arr: ListPayloadType) =>
  arr.map((item) => {
    const obj = { value: '', label: '' };
    obj.value = item.value;
    obj.label = item.text;
    return obj;
  });
