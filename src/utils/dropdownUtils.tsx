import { useSelector } from 'react-redux';

import { RootState } from '../redux/ducks';
import { DropdownStoreType } from '../redux/ducks/dropdowns.d';

export const displayDropdownListText = (
  id: number | undefined,
  listKey: keyof DropdownStoreType
) => {
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  return dropdowns[listKey].list.find((item) => item.value === String(id))?.text;
};

export const getDropdownListValue = (id: number | undefined, listKey: keyof DropdownStoreType) => {
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  return String(dropdowns[listKey].list.find((item) => item.value === String(id))?.value);
};
