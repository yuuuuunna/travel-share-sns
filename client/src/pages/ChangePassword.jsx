import Header from '../components/Login/Header';
import Button from '../components/commons/Button';
import InputWithLabel from '../components/Input/InputWithLabel';

import logo from '../assets/logo.png';
import InputPassword from '../components/Input/InputPassword';
import usePassword from '../hooks/usePassword';
import { useLocation } from 'react-router';

export default function ChangePassword() {
  const location = useLocation();
  const email = location?.state?.email;

  const {
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
    passwordValidationMessage,
    checkPasswordValidationMessage,
    handleChangePassword,
  } = usePassword();

  if (email === undefined) throw Error('접근이 올바르지 않습니다.');

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center ">
      <div className="w-mobile p-6 flex flex-col items-center">
        <Header />
        <img src={logo} alt={logo} className="max-w-[63px] max-h-[77px] mb-5" />
        <div className="flex flex-col [&>:not(:first-child)]:mt-2">
          <h2 className="text-xl font-bold text-center ">비밀번호 변경</h2>
          <p className="text-xs">비밀번호를 변경해주세요.</p>
        </div>
        <div className="w-full py-10 [&>:not(:first-child)]:mt-5 flex flex-1 flex-col">
          <InputWithLabel
            labelText={'비밀번호'}
            InputComponent={
              <InputPassword
                value={password}
                name={'password'}
                onChangeFunc={setPassword}
                placeholder={'비밀번호 입력'}
                isValid={passwordValidationMessage === ''}
              />
            }
            validateMessage={passwordValidationMessage === '' ? '' : `필수 조건: ${passwordValidationMessage}`}
          />
          <InputWithLabel
            labelText={'비밀번호 확인'}
            InputComponent={
              <InputPassword
                value={checkPassword}
                name={'check-password'}
                onChangeFunc={setCheckPassword}
                placeholder={'비밀번호 재입력'}
                isValid={checkPasswordValidationMessage === '' && checkPassword !== ''}
              />
            }
            validateMessage={checkPasswordValidationMessage}
          />
        </div>
        <Button
          type={'default'}
          text={'bold'}
          isDisabled={passwordValidationMessage !== '' || checkPasswordValidationMessage !== ''}
          onClick={() => handleChangePassword({ email })}
        >
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}
