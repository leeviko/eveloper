import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import SearchForm from "./SearchForm";
import Dropdown from "./Dropdown";

import AccountImg from "../../images/account_fill.svg";


const LoggedIn = () => {
  const username = useSelector(state => state.auth.user.name);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Link to="/create-new" className="nav-item create-new-btn btn">Create a Post</Link>
      <button
        className="nav-item nav-item-btn profile-nav-link" 
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <img alt="" src={AccountImg} />
        <span>{username}</span>
        <Dropdown show={showMenu} username={username} />
      </button>
    </>
  )
}

const NotLoggedIn = () => {
  return (
    <>
      <Link className="nav-item btn-outline" to="/login">Login</Link>
      <Link className="nav-item btn" to="/register">Register</Link>
    </>
  )
}

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link className="nav-brand" to="/">Eveloper</Link>
        <SearchForm />
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
