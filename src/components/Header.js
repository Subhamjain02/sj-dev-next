// components/Navbar.js
import React from "react";
import "./Header.css";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand ms-4 " href="#">
          <Image
            src="/SJ logo.png"
            width={150}
            height={40}
            alt="Picture of the author"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item me-md-4">
              <a className="nav-link" aria-current="page" href="#">
                Our Project
              </a>
            </li>
            <li className="nav-item me-md-2">
              <a className="nav-link" href="#">
                Partnerships
              </a>
            </li>
            <li className="nav-item ms-md-2">
              <a className="nav-link" href="#">
                Contact us
              </a>
            </li>
            <li className="nav-item ms-md-4">
              <a className="nav-link" href="#">
                About us
              </a>
            </li>
          </ul>
          <ul className="navbar-nav me-4">
            <li className="nav-item dropdown border rounded rounded-7 explore text-center text-light">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Explore
              </a>
              <ul
                className="dropdown-menu text-center"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item " href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    Something
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
