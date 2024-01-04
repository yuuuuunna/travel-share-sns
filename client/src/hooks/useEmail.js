import { useState, useMemo, useCallback } from 'react';
import authAPI from '../services/auth';
import useModal from './useModal';

export default function useEmail() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isAvailableEmailInput, setIsAvailableEmailInput] = useState(true);
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);
  const { openModal } = useModal();

  const emailValidationMessage = useMemo(() => {
    if (email.length === 0) return '이메일을 작성해주세요.';
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.exec(email) === null ? '이메일 형식에 맞춰서 작성해주세요.' : '';
  }, [email]);

  const handleExpire = useCallback(() => {
    openModal({ message: `입력 시간이 지났습니다.\n다시 인증번호를 요청 해주세요.` });
    setIsVerificationVisible(false);
  }, [openModal]);

  const handleSendValidationCode = async ({ type }) => {
    return await authAPI
      .getEmailVerifyCode({ email, type })
      .then(() => {
        openModal({ message: `메일이 전송되었습니다.\n5분 안에 인증번호를 입력해주세요.` });
        setIsAvailableEmailInput(false);
        setIsVerificationVisible(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        switch (error?.status) {
          case 400: {
            openModal({ message: error?.message ?? '메일 전송 중 오류가 발생했습니다' });
            break;
          }
          case 500: {
            openModal({ message: `메일 전송에 실패했습니다.\n메일 주소가 유효한지 확인해주세요.` });
            break;
          }
          default: {
            openModal({ message: `메일 전송 중 오류가 발생했습니다.` });
            break;
          }
        }
      });
  };

  const handleCheckValidationCode = async () => {
    return await authAPI
      .checkEmailVerifyCode({ email, authCode: verificationCode })
      .then((data) => {
        openModal({ message: `인증번호가 일치합니다.` });
        setIsVerificationVisible(false);
        setIsEmailCertificated(true);
        return data;
      })
      .catch((error) => {
        switch (error?.status) {
          case 400: {
            openModal({ message: error?.message ?? '인증번호 확인 중 오류가 발생했습니다.' });
            break;
          }
          case 500: {
            openModal({ message: `인증번호 확인 중 오류가 발생했습니다.` });
            break;
          }
          default: {
            openModal({ message: `인증번호 확인 중 오류가 발생했습니다.` });
            break;
          }
        }
      });
  };

  return {
    email,
    setEmail,
    isLoading,
    setIsLoading,
    verificationCode,
    setVerificationCode,
    isAvailableEmailInput,
    isVerificationVisible,
    isEmailCertificated,
    emailValidationMessage,
    handleExpire,
    handleSendValidationCode,
    handleCheckValidationCode,
  };
}
