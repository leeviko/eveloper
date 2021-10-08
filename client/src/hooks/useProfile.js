import { useState, useEffect } from "react";
import axios from "axios";
import { PROFILE_ERROR, GET_PROFILE } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useProfile = (name) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const userProfile = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  

    axios.get(`/api/users/profile/${name}`, headers)
      .then((res) => {
        dispatch({ type: GET_PROFILE })
        setProfile(res.data)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "PROFILE_ERROR"));
        dispatch({
          type: PROFILE_ERROR
        })
      })

  }

  useEffect(() => {
    userProfile()
  }, [])


  return profile;
}

export default useProfile;