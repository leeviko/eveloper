import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";

import useForm from "../hooks/useForm";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const error = useSelector(state => state.error);
  const [errors, setErrors] = useState([]);
  const [values, handleChange] = useForm({ email: "", password: "" });

  // Clear errors on page refresh
  useEffect(() => {
    dispatch(clearErrors());
    setErrors([])
  }, [])
  
  // Check errors
  useEffect(() => {
    if(error.id === "LOGIN_FAIL") {
      setErrors([])
      error.msg.map((msg) => (
        setErrors(prev => [...prev, {msg: msg.msg, param: msg.param}])
      ))
    }
  }, [error])

  // Submit
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
      { isAuthenticated && <Redirect to="/"/> }
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <h1 className="title">Login</h1>
          <label>Email</label>
          <input name="email" type="text" value={values.email} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} />
          <ul className="errors">
            {
              errors ? errors.map((error, i) => (
                <li className="alert" key={i}>{error.msg}</li>
              )) : null
            }
          </ul>

          <input type="submit" value="Login" className="submit-btn btn" />
        </form>
      </div>
    </div>
  )
}

export default Login
