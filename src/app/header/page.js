import React from "react";
import "./header.css";

import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

function Header() {
  return (
    <nav className="navbar">
      <div className="menu">
        <ul className="list">
          <li className="item ">
            <a href="#">
              <span className="icon">
                <IoMdHome />
              </span>
              <span className="text">Home</span>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <span className="icon">
                <FaUserAlt />
              </span>
              <span className="text">About</span>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <span className="icon">
                <IoMdMenu />
              </span>
              <span className="text">Menu</span>
            </a>
          </li>
          <li className="item">
            <a href="#">
              <span className="icon set">
                <IoSettings />
              </span>
              <span className="text">Setting</span>
            </a>
          </li>
          <div className="ind" />
        </ul>
      </div>
    </nav>
  );
}

export default Header;
