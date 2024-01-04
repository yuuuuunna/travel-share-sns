import { useState, useMemo } from 'react';

import { PASSWORD_VALIDATION_CONDITION } from '../constants/passwordValidationConditions';
import authAPI from '../services/auth';
import useModal from './useModal';
import { useNavigate } from 'react-router-dom';

export default function usePassword() {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const { openModal } = useModal();
  const navigate = useNavigate();

  const passwordValidationMessage = useMemo(() => {
    return `${PASSWORD_VALIDATION_CONDITION.filter((condition) => {
      return !condition.validateFunction(password);
    })
      .map((condition) => condition.name)
      .join(', ')}`;
  }, [password]);

  const checkPasswordValidationMessage = useMemo(() => {
    return password === checkPassword ? '' : '비밀번호가 일치하지 않습니다';
  }, [password, checkPassword]);

  const handleChangePassword = async ({ email }) => {
    await authAPI
      .changePassword({ email, password })
      .then(() => {
        openModal({ message: '변경이 완료되었습니다.', callback: () => navigate('/login') });
      })
      .catch((error) => {
        switch (error?.response?.status) {
          case 400: {
            openModal({ message: '해당 유저가 존재하지 않습니다.' });
            break;
          }
          case 403: {
            openModal({ message: '다른 유저의 비밀번호는 변경할 수 없습니다.' });
            break;
          }
          default: {
            openModal({ message: '비밀번호 변경 중 오류가 발생하였습니다.' });
            break;
          }
        }
      });
  };

  return {
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    handleChangePassword,
    passwordValidationMessage,
    checkPasswordValidationMessage,
  };
}
