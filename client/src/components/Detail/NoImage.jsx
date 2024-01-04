import logo from '../../assets/logo.png';

export default function NoImage() {
  return (
    <div className="w-[236px] h-[87px] bg-white flex flex-col items-center justify-center">
      <img src={logo} alt="여기다" className="w-[50%] h-[50%] object-contain opacity-20" />
      <p className="text-[12px] absolute">등록된 사진이 없습니다.</p>
    </div>
  );
}
