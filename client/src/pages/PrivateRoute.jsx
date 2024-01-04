import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoils/userAtom';
import { useEffect } from 'react';
import { PATH } from '../constants/path';

export default function PrivateRoute() {
  const { loginUserInfo, isPrivate, isError, pathname } = useAuth();
  const setUser = useSetRecoilState(userState);

  // 로그인 유저정보 recoil에 저장
  useEffect(() => {
    if (loginUserInfo && !isError) {
      setUser(loginUserInfo);
    }
  }, [isError, loginUserInfo, setUser]);

  //(auth 401받는거 && 로그인이 필요한 페이지인지 && 현재 페이지가 main이 아니면) 로그인으로 이동
  if (isError && isPrivate && pathname !== PATH.root) return <Navigate to="/login" />;
  return <Outlet />;
}
