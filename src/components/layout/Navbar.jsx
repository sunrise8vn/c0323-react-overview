import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <NavLink className="navbar-brand" to={'/'}>
          React Route DOM
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={'/student/list'}
              >
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/post/list'}>
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/products'}>
                Products
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
