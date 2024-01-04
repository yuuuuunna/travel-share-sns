import kakao from '../../assets/kakao.svg';
import { IoMail } from 'react-icons/io5';

import Button from '../commons/Button';

import { Link } from 'react-router-dom';

export default function LoginSelectContainer() {
  return (
    <div className="w-mobile [&>:not(:first-child)]:mt-5 flex flex-col items-center py-10 px-6">
      <a href={`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/kakao`} className="w-full">
        <Button type={'kakao'} size={'large'} text={'bold'}>
          <img src={kakao} className="box-content w-4 pr-2"></img>
          <span className="font-bold">카카오</span>로 로그인
        </Button>
      </a>
      <Link to="?type=email" className="w-full">
        <Button type={'default'} size={'large'} text={'bold'}>
          <IoMail className="box-content pr-2" />
          <span className="font-bold">이메일</span>로 로그인
        </Button>
      </Link>
      <Link to="/signup" className="w-full">
        <Button type={'default'} size={'large'} text={'bold'}>
          <IoMail className="box-content pr-2" />
          <span className="font-bold">이메일</span>로 회원가입
        </Button>
      </Link>
    </div>
  );
}
