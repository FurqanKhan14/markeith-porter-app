import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import './appLayout.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';

const UserLayout = ({ redirectPath = null }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      return navigate(redirectPath);
    }
  }, [redirectPath]);

  return (
    <>
      <Header />
      <div className="appContainer">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
