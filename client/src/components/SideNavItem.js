import React from 'react';
import { Link } from "react-router-dom";

const SideNavItem = ({ active, link, text }) => {
  return (
    <Link to={link} className={"sidenav-item " + (active == link ? "active" : "")}>
      <span className="sidenav-item-text">{text}</span>
    </Link>
  )
}

export default SideNavItem
