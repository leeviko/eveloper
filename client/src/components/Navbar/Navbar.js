import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Search from "./Search";
import Dropdown from "./Dropdown";

import AccountImg from "../../images/account_fill.svg";
import AlertImg from "../../images/notifications.svg";


const LoggedIn = () => {
  const username = useSelector(state => state.auth.user.name);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Fragment>
      <Link to="/create-new" className="nav-item create-new-btn btn">Create a Post</Link>
      <button className="nav-item nav-item-btn alert-link"><img alt="" src={AlertImg} /></button>
      <button
        className="nav-item nav-item-btn profile-nav-link" 
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img alt="" src={AccountImg} />
        <span>{username}</span>
        <Dropdown show={showMenu} />
      </button>
    </Fragment>
  )
}

const NotLoggedIn = () => {
  return (
    <Fragment>
      <Link className="nav-item btn-outline" to="/login">Login</Link>
      <Link className="nav-item btn" to="/register">Register</Link>
    </Fragment>
  )
}

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-brand">Eveloper</div>
        <Search />
        <div className={"nav-items " + (isLoading ? "hide" : "")}>
          {
            isAuthenticated ? <LoggedIn /> : <NotLoggedIn />
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
