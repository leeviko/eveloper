import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router';
import { logout } from "../../actions/authActions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
  }, [])

  return (
    <div className="info-page logout">
      <Redirect to="/" />
      <h1 className="title">Logged out succesfully</h1>
    </div>
  )
}

export default Logout;
