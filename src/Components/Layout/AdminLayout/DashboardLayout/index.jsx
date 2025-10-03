import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Navbar/Navbar.jsx';
import Sidebar from '../../../../Components/Sidebar/Sidebar.jsx';
import './appLayout.css';

const DashboardLayout = ({ disableSidebar = false, redirectPath = null }) => {
  const [sideBarClass, setSideBarClass] = useState(
    window.innerWidth < 991 ? 'collapsed' : ''
  );
  const navigate = useNavigate();

  function sideBarToggle() {
    setSideBarClass((prevClass) => (prevClass === '' ? 'collapsed' : ''));
  }

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setSideBarClass('collapsed');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (redirectPath) {
      return navigate(redirectPath);
    }
  }, [redirectPath]);



  
  const [expanded, setExpanded] = useState(true);

  function toggleSideNav(e) {
    setExpanded(!expanded);
  }
  useEffect(() => {
    if (window.innerWidth <= 991) {
      setExpanded(!expanded);
    } else {
      setExpanded(expanded);
    }
    function handleResize() {
      if (window.innerWidth <= 991) {
        setExpanded(!expanded);
      } else {
        setExpanded(expanded);
      }
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* <Header toggleSideNav={toggleSideNav} /> */}
      <Header sideBarToggle={sideBarToggle} sideBarClass={sideBarClass} />
      <div
        className={`${
          expanded ? 'menu-expanded ' : 'menu-collapsed body-expanded '
        }app-content content`}
      >
        <Sidebar
          sideBarToggle={sideBarToggle}
          sideBarClass={sideBarClass}
          disable={disableSidebar}
        />

        {/* <Sidebar /> */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>

      {/* <Navbar sideBarToggle={sideBarToggle} sideBarClass={sideBarClass} /> */}
      {/* <div>
        <Sidebar
          sideBarToggle={sideBarToggle}
          sideBarClass={sideBarClass}
          disable={disableSidebar}
        />
        <div
          className={`screensSectionContainer ${
            sideBarClass ? 'expanded' : ''
          }`}
        >
          <div className="appContainer">
            <Outlet />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DashboardLayout;
