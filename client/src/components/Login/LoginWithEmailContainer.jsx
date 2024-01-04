import Input from '../commons/Input';
import Button from '../commons/Button';
import InputWithLabel from '../Input/InputWithLabel';
import InputPassword from '../Input/InputPassword';

import authAPI from '../../services/auth';

import { Link, useNavigate } from 'react-router-dom';
import usePassword from '../../hooks/usePassword';
import useEmail from '../../hooks/useEmail';
import useModal from '../../hooks/useModal';

export default function LoginWithEmailContainer() {
  const navigate = useNavigate();

  const { email, setEmail, emailValidationMessage } = useEmail();
  const { password, setPassword, passwordValidationMessage } = usePassword();
  const { openModal } = useModal();

  const handleLogin = async () => {
    await authAPI
      .login({ email, password })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        switch (error?.status) {
          case 400: {
            openModal({ message: `이메일 또는 비밀번호가 일치하지 않습니다.` });
            break;
          }
        }
      });
  };

  return (
    <div className="w-mobile p-6">
      <form method="post" className="py-10">
        <div className="[&>:not(:first-child)]:mt-5">
          <InputWithLabel
            labelText={'이메일'}
            InputComponent={
              <Input
                type={'default'}
                value={email}
                inputType={'email'}
                name={'email'}
                placeholder={'이메일 주소 입력'}
                onChangeFunc={setEmail}
                isValid={emailValidationMessage == ''}
              />
            }
            validateMessage={emailValidationMessage}
          />
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
        </div>
      </form>
      <Button
        type={'primary'}
        text={'bold'}
        onClick={handleLogin}
        isDisabled={emailValidationMessage !== '' || passwordValidationMessage !== ''}
      >
        로그인
      </Button>
      <Link to="/find-password" className="mt-4 block">
        <p className="flex justify-center">
          <span className="text-xs text-black cursor-pointer">비밀번호가 생각나지 않나요?</span>
        </p>
      </Link>
    </div>
  );
}
