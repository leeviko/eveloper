import React, { Fragment } from 'react'
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <Fragment>
      <Link className="nav-item btn-outline" to="/login">Login</Link>
      <Link className="nav-item btn" to="/register">Register</Link>
    </Fragment>
  )
}

export default NotLoggedIn
