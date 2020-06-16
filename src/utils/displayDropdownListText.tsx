import { useSelector } from 'react-redux';

import { RootState } from '../redux/ducks';
import { DropdownStoreType } from '../redux/ducks/dropdowns.d';

const displayDropdownListText = (id: number | undefined, listKey: keyof DropdownStoreType) => {
  const dropdowns = useSelector((state: RootState) => state.dropdowns);
  return dropdowns[listKey].list.find((item) => item.value === String(id))?.text;
};

export default displayDropdownListText;
