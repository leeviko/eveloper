import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions"; 
import { clearErrors } from "../actions/errorActions"; 
import { Link, Redirect } from "react-router-dom";

import useForm from "../hooks/useForm";

const Login = () => {
  const [values, handleChange] = useForm({  email: "", name: "", password: "", confirmPassword: "" })
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const error = useSelector(state => state.error)
  const [errors, setErrors] = useState([]);
  const [msg, setMsg] = useState("");

  // Clear errors on page refresh
  useEffect(() => {
    dispatch(clearErrors());
    setErrors([])
  }, [])
  
  // Check errors
  useEffect(() => {
    if(error.id === "REGISTER_FAIL") {
      setErrors([])
      error.msg.map((msg) => (
        setErrors(prev => [...prev, {msg: msg.msg, param: msg.param}])
      ))
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password, confirmPassword } = values;

    if(password !== confirmPassword) {
      setMsg("Password doesn't match")
    } else {
      setMsg(null)
      const newUser = {
        email,
        name,
        password
      }
  
      dispatch(register(newUser))
    }


  }

  return (
    <div className="login register">
      { isAuthenticated && <Redirect to="/"/> }
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <h1 className="title">Create new account</h1>
          <label>Email</label>
          <input name="email" type="text" value={values.email} onChange={handleChange} />
          <label>Name</label>
          <input name="name" type="text" value={values.name} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} />
          <label>Confirm password</label>
          <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} />
          <ul className={"errors " + (errors[0] ? "show" : "hide") }>
            {
              errors ? errors.map((error, i) => (
                <li className="alert" key={i}>{error.msg}</li>
              )) : null
            }

            {
              msg ? <li className="alert">{msg}</li> : null
            }
          </ul>
          <input type="submit" value="Register" className="submit-btn btn" />
        </form>
      </div>
    </div>
  )
}

export default Login
