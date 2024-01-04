import { atom } from 'recoil';
import { ATOM_KEY } from '../constants/atomKey';

export const modalAtom = atom({
  key: ATOM_KEY['modal'],
  default: {
    isOpen: false,
    type: null,
    message: '',
    callback: () => {},
  },
});
