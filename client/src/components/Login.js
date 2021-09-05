import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

import useForm from "../hooks/useForm";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error.msg);
  const [msg, setMsg] = useState(null);
  const [values, handleChange] = useForm({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearErrors());
  }, [])

  useEffect(() => {
    error.id == "LOGIN_FAIL" ? setMsg(error.msg.msg) : setMsg(null);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;

    const user = {
      email,
      password
    };

    dispatch(login(user));
  }

  return (
    <div className="login register">
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <h1 className="title">Login</h1>
          <label>Email</label>
          <input name="email" type="text" value={values.email} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} />
          <input type="submit" value="Login" className="submit-btn btn" />
        </form>
      </div>
    </div>
  )
}

export default Login
