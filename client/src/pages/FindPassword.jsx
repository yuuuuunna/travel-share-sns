import Header from '../components/Login/Header';
import Button from '../components/commons/Button';
import InputWithCheckButton from '../components/Input/InputWithCheckButton';
import InputWithLabel from '../components/Input/InputWithLabel';
import InputWithVerifyCode from '../components/Input/InputWithVerifyCode';

import logo from '../assets/logo.png';

import { useNavigate } from 'react-router-dom';
import useEmail from '../hooks/useEmail';

export default function FindPassword() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    isLoading,
    setIsLoading,
    emailValidationMessage,
    verificationCode,
    setVerificationCode,
    isAvailableEmailInput,
    isVerificationVisible,
    handleExpire,
    handleSendValidationCode,
    handleCheckValidationCode,
  } = useEmail();

  const handleLink = () => {
    handleCheckValidationCode().then((data) => {
      if (data?.status === 200) {
        navigate('/change-password', { state: { email } });
      }
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <div className="w-mobile p-6 flex flex-col items-center">
        <Header />
        <img src={logo} alt={logo} className="max-w-[63px] max-h-[77px] mb-5" />
        <div className="flex flex-col [&>:not(:first-child)]:mt-2">
          <h2 className="text-xl font-bold text-center ">비밀번호 찾기</h2>
          <p className="text-xs">가입하신 이메일을 입력해주세요.</p>
        </div>
        <div className="w-full py-10 [&>:not(:first-child)]:mt-5 flex flex-1 flex-col">
          <InputWithLabel
            labelText={'이메일'}
            InputComponent={
              <InputWithCheckButton
                value={email}
                inputType={'email'}
                name={'email'}
                placeholder={'이메일 주소 입력'}
                onChangeFunc={setEmail}
                buttonType={'default'}
                buttonChildren={'이메일 인증하기'}
                isButtonDisabled={isLoading || emailValidationMessage !== '' || !isAvailableEmailInput}
                isInputDisabled={!isAvailableEmailInput}
                isValid={emailValidationMessage === ''}
                onClick={() => {
                  setIsLoading(true);
                  handleSendValidationCode({ type: 'change-password' });
                }}
              />
            }
            validateMessage={emailValidationMessage}
          />
          {isVerificationVisible && (
            <InputWithVerifyCode
              time={300}
              value={verificationCode}
              onChangeFunc={setVerificationCode}
              onExpire={handleExpire}
            />
          )}
        </div>
        {isVerificationVisible && (
          <Button type={'default'} text={'bold'} onClick={handleLink}>
            인증번호 확인하기
          </Button>
        )}
      </div>
    </div>
  );
}
