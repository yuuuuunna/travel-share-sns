import { atom } from 'recoil';
import { ATOM_KEY } from '../constants/atomKey';

export const cityState = atom({
  key: ATOM_KEY.city,
  default: '',
});
