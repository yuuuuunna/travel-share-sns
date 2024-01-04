import { atom, selector } from 'recoil';
import { ATOM_KEY } from '../constants/atomKey';

export const notificationListState = atom({
  key: ATOM_KEY.notification,
  default: [],
});

export const notificationCountState = selector({
  key: ATOM_KEY.notificationCount,
  get: ({ get }) => {
    const notification = get(notificationListState);
    return notification?.filter((item) => {
      return item.isRead === false;
    })?.length;
  },
});
