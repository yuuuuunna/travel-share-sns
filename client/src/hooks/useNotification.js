import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { notificationCountState, notificationListState } from '../recoils/notificationAtom';

export default function useNotification() {
  const [notificationList, setNotificationList] = useRecoilState(notificationListState);
  const notificationCount = useRecoilValue(notificationCountState);

  const resetNotification = useResetRecoilState(notificationListState);

  return { notificationList, setNotificationList, notificationCount, resetNotification };
}
