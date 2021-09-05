import React from 'react'

import useForm from "../hooks/useForm";

const Login = () => {
  const [values, handleChange] = useForm({ email: "", password: "" })

  return (
    <div className="login register">
      <div className="form-container">
        <form className="login-form">
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
