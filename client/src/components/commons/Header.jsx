import logo from '/logo.svg';

export default function Header() {
  return (
    <header className="w-full h-header bg-white text-center fixed top-0 left-0 z-10">
      <h1 className="h-full inline-block cursor-pointer p-[12px]">
        <a href="/">
          <img src={logo} alt="logo" className="h-full" />
        </a>
      </h1>
    </header>
  );
}
