// components/Navbar.js
import React from 'react';
import './Header.css'

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand ms-4 fs-4" href="#">SJ developers</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Our Project</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Partnerships</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About us</a>
            </li>
          </ul>
          <ul className="navbar-nav me-4">
            <li className="nav-item dropdown border rounded rounded-7 explore text-center text-light">
              <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Explore
              </a>
              <ul className="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item " href="#">Action</a></li>
                <li><a className="dropdown-item " href="#">Another action</a></li>
                <li><a className="dropdown-item " href="#">Something</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
