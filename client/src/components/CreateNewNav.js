import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

import Close from "../images/close.svg";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <nav className="nav sec-nav">
      <div className="nav-container">
        <Link className="nav-brand" to="/">Eveloper</Link>
        <Link className="nav-title" to="/">Create Post</Link>
        <div className={"nav-items " + (isLoading ? "hide" : "")}>
          <Link className="nav-close-btn" to="/"><img alt="" src={Close} /></Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
