import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user',
});

export const userState = atom({
  key: 'info',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
