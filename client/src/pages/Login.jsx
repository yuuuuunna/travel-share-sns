import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import logoTitleImage from '../assets/logo-title.svg';
import Header from '../components/Login/Header';

import LoginSelectContainer from '../components/Login/LoginSelectContainer';
import LoginWithEmailContainer from '../components/Login/LoginWithEmailContainer';

export default function Login() {
  const [searchParams] = useSearchParams();

  const type = useMemo(() => {
    return searchParams.get('type');
  }, [searchParams]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-6">
      <Header />
      <img className="min-w-[149px] min-h-[91px]" src={logoTitleImage} alt="logo title"></img>
      {(type === undefined || type === null) && <LoginSelectContainer />}
      {type === 'email' && <LoginWithEmailContainer />}
    </div>
  );
}
