import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS
} from "../actions/types";

// Check if authenticated
export const isAuth = () => dispatch => {
  dispatch({ type: LOADING });

  axios.get("/api/auth", { withCredentials: true })
    .then((res) => 
      dispatch({
        type: AUTH_SUCCESS,
        payload: res.data
      })  
    )
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR
      })
    })
} 

// Login
export const login = ({ email, password }) => dispatch => {
  dispatch({ type: LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = { email, password }

  axios.post("/api/auth", body, headers)
    .then((res) => {
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Register
export const register = ({ email, name, password }) => dispatch => {
  dispatch({ type: LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = { email, name, password };

  axios.post("/api/users", body, headers)
    .then(res => 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
      dispatch({
        type: REGISTER_FAIL
      });
    })
}

// Logout
export const logout = () => dispatch => {
  
  axios.delete("/api/users/logout", { withCredentials: true })
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => {
      console.log(err);
    })
}
