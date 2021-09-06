import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

import AccountImg from "../../images/account_fill.svg";
import AlertImg from "../../images/notifications.svg";


const LoggedIn = () => {
  return (
    <Fragment>
      <Link to="/create-new" className="nav-item create-new-btn btn">Create a Post</Link>
      <button className="nav-item-btn nav-item"><img alt="" src={AlertImg} /></button>
      <Link className="nav-item profile-link" to="/profile" >
        <img alt="" src={AccountImg} />
        <span>Username</span>
      </Link>
    </Fragment>
  )
}

export default LoggedIn
