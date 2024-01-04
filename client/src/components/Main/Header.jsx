import { useNavigate } from 'react-router';
import logo from '../../assets/logo.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[64px] flex justify-center items-center ">
      <img src={logo} alt="여기다" className="w-[30px] cursor-pointer" onClick={() => navigate('/')} />
    </div>
  );
}
