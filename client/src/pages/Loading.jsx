import spinner from '../assets/images/spinner.gif';

export default function Loading() {
  return (
    <div className="bg-white w-full h-screen flex items-center justify-center">
      <img src={spinner} alt="loading" />
    </div>
  );
}
