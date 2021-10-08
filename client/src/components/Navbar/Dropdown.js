import React from 'react';
import { Link } from "react-router-dom";

const Dropdown = ({ show, username }) => {

  

  return (  
    <div className={"dropdown " + (show ? "show" : "hide")}>
      <div className="dropdown-menu">
        <Link className="dropdown-link nav-item" to={"/profile/" + username}>Profile</Link>
        <Link className="dropdown-link nav-item" to="/settings">Settings</Link>
        <Link className="dropdown-link nav-item" to="/logout">Log out</Link>
      </div>
    </div>
  )
}

export default Dropdown;
