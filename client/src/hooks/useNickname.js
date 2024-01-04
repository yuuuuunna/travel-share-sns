import { useState, useMemo } from 'react';
import userAPI from '../services/user';
import useModal from './useModal';

export default function useNickname() {
  const [nickname, setNickname] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const { openModal } = useModal();

  const checkNicknameMessage = useMemo(() => {
    return nickname.length > 0 ? '' : '닉네임을 입력해주세요';
  }, [nickname]);

  const handleCheckNickname = async () => {
    await userAPI
      .checkNickname({ nickname })
      .then(() => {
        openModal({ message: `사용할 수 있는 닉네임입니다.` });
        setIsNicknameAvailable(true);
      })
      .catch((error) => {
        switch (error?.status) {
          case 409: {
            openModal({ message: `이미 사용중인 닉네임 입니다.` });
            break;
          }
          default: {
            openModal({ message: `닉네임 중복 확인 중 오류가 발생했습니다.` });
            break;
          }
        }
      });
  };

  return { nickname, setNickname, isNicknameAvailable, checkNicknameMessage, handleCheckNickname };
}
