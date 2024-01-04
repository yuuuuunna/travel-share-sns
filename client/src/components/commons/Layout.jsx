import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useState } from 'react';

export default function Layout() {
  const [navbarHidden, setNavbarHidden] = useState(false);
  return (
    <>
      <Outlet context={{ setNavbarHidden }} />
      {!navbarHidden && <Navbar />}
    </>
  );
}
