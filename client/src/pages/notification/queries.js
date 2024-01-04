import { useQuery, useMutation } from 'react-query';
import { queryKeys, queryClient } from '../../store/reactQuery';
import alarmsAPI from '../../services/alarms';
import { useState } from 'react';
import { isValidUser } from '../../utils/isValidUser';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';

export const useNotificationQuery = () => {
  const user = useRecoilValue(userState);
  const [lastItemId, setLastItemId] = useState(null);
  const { data, refetch } = useQuery({
    queryKey: [queryKeys.notification],
    queryFn: () => {
      if (isValidUser(user)) {
        return alarmsAPI.getAllAlarms({ perPage: 10, lastItemId });
      }
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const invalidateMatchQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.notification],
    });
  };

  const readAlarm = useMutation({
    mutationFn: (alarmId) => alarmsAPI.setAlarmRead(alarmId),
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const deleteAlarm = useMutation({
    mutationFn: (alarmId) => alarmsAPI.deleteAlarm(alarmId),
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const deleteAllAlarm = useMutation({
    mutationFn: alarmsAPI.deleteAllAlarm,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return {
    data: data?.data,
    refetch,
    lastItemId: data?.lastItemId,
    setLastItemId,
    readAlarm,
    deleteAlarm,
    deleteAllAlarm,
  };
};
