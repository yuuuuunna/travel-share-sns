import { useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCheckLoginQuery } from '../pages/auth/queries';
import { PATH } from '../constants/path';

//꼭 로그인해야 하는 페이지 링크를 여기에다 입력하기
const PRIVATE_PATHS = [PATH.root, PATH.mypage, PATH.notification, PATH.schedule];

export function useAuth() {
  const { pathname } = useLocation();
  const { loginUserInfo, refetch, isError } = useCheckLoginQuery();

  //현재 페이지링크가 PRIVATE_PATHS 링크중에 하나라면
  const isPrivate = useMemo(() => {
    return PRIVATE_PATHS.includes(pathname);
  }, [pathname]);

  const getUserAuth = useCallback(async () => {
    if (isPrivate) {
      return await refetch();
    }
  }, [isPrivate, refetch]);

  useEffect(() => {
    getUserAuth();
  }, [getUserAuth, pathname]);

  return { loginUserInfo, isPrivate, isError, getUserAuth, pathname };
}
