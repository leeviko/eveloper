import { useState, useEffect } from "react";
import axios from "axios";
import { UPDATE_ERROR, UPDATE_USER } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useUpdateUser = (description) => {
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(null);

  const updateUser = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    const body = { edit: { description } }

    axios.put(`/api/users/`, body, headers)
      .then((res) => {
        dispatch({ type: UPDATE_USER })
        setIsUpdated(true)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_ERROR"));
        dispatch({
          type: UPDATE_ERROR
        })
        setIsUpdated(false)
      })

    return isUpdated
  }

  return [isUpdated, () => {
    updateUser()
  }];
}

export default useUpdateUser;