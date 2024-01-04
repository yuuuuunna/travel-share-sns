import { useResetRecoilState } from 'recoil';
import { userState } from '../recoils/userAtom';
import { useNavigate } from 'react-router';
import { PATH } from '../constants/path';
import toast from 'react-hot-toast';
import useNotification from './useNotification';

export const useResetAuth = () => {
  const navigate = useNavigate();
  const resetAuthToken = useResetRecoilState(userState);
  const { resetNotification } = useNotification();

  return () => {
    toast.success('로그아웃 되었습니다.');

    //home화면으로 이동
    navigate(PATH.root);
    //recoil의 user정보 지우기
    //localhost의 user정보 지우기
    resetAuthToken();
    resetNotification();
  };
};

export const useWithdraw = () => {
  const navigate = useNavigate();
  const resetAuthToken = useResetRecoilState(userState);
  const { resetNotification } = useNotification();

  return () => {
    toast.success('탈퇴되었습니다.');
    navigate(PATH.root);
    resetAuthToken();
    resetNotification();
  };
};
