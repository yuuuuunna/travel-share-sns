import notFound from '../assets/images/404.svg';

export default function Notfound() {
  return (
    <div className="bg-white w-full h-screen flex flex-col gap-3 items-center justify-center">
      <img src={notFound} alt="notfound-page" />
      <p className="text-[20px] font-medium">페이지를 찾을 수 없습니다.</p>
    </div>
  );
}
