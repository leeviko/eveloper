import React from 'react';
import { Link } from "react-router-dom";

import Search from "./Search";

import AccountImg from "../../images/account_fill.svg";
import AlertImg from "../../images/notifications.svg";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">Eveloper</div>
        <Search />
        <div className="nav-items">
          <Link className="nav-item btn-outline" to="/login">Login</Link>
          <Link className="nav-item btn" to="/register">Register</Link>
          {/* <Link to="/create-new" className="nav-item create-new-btn btn">Create a Post</Link>
          <button className="nav-item-btn nav-item"><img alt="" src={AlertImg} /></button>
          <Link className="nav-item profile-link" to="/profile" >
            <img alt="" src={AccountImg} />
            <span>Username</span>
          </Link> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
