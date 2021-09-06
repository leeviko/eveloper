import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

import Search from "./Search";

const Navbar = () => {
  const dispatch = useDispatch();
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
