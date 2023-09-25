import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import LeftSideBar from './LeftSideBar';

const Index = () => {
  const navigate = useNavigate();

  // navigate('/')
  return (
    <>
      <Navbar />

      <div className="container d-flex">
        <div className="sidebar me-3">
          <LeftSideBar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Index;
