import { useSelector } from 'react-redux';

import { RootState } from '../redux/ducks';
import { DropdownStoreType, ListPayloadType } from '../redux/ducks/dropdowns.d';

export const getDropdownListText = (list: ListPayloadType, id: string) => {
  return list.find((item) => item.value === String(id))?.text;
};

export const displayDropdownListText = (
  id: number | undefined,
  listKey: keyof DropdownStoreType
) => {
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  return getDropdownListText(dropdowns[listKey].list, String(id));
};

export const getDropdownListValue = (id: number | undefined, listKey: keyof DropdownStoreType) => {
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  return String(dropdowns[listKey].list.find((item) => item.value === String(id))?.value);
};
