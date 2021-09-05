import React from 'react'

import useForm from "../hooks/useForm";

const Login = () => {
  const [values, handleChange] = useForm({  email: "", name: "", password: "", confirmPassword: "" })

  return (
    <div className="login register">
      <div className="form-container">
        <form className="login-form">
          <h1 className="title">Create new account</h1>
          <label>Email</label>
          <input name="email" type="text" value={values.email} onChange={handleChange} />
          <label>Name</label>
          <input name="name" type="text" value={values.name} onChange={handleChange} />
          <label>Password</label>
          <input name="password" type="password" value={values.password} onChange={handleChange} />
          <label>Confirm password</label>
          <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} />
          <input type="submit" value="Register" className="submit-btn btn" />
        </form>
      </div>
    </div>
  )
}

export default Login
