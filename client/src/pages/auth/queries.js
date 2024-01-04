import { useQuery } from 'react-query';
import { queryKeys } from '../../store/reactQuery';
import authAPI from '../../services/auth';

export const useCheckLoginQuery = () => {
  const {
    data: loginUserInfo,
    refetch,
    isError,
  } = useQuery({
    queryKey: [queryKeys.loginStatus],
    queryFn: authAPI.verify,
    useErrorBoundary: false,
    enabled: false,
    select: (data) => data.data.user,
    onError: () => {},
  });

  return { loginUserInfo, refetch, isError };
};
