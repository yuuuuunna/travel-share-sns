import { atom } from 'recoil';
import { ATOM_KEY } from '../constants/atomKey';

export const filterState = atom({
  key: ATOM_KEY.filter,
  default: [],
});
