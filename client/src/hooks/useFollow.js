import { useState, useEffect } from "react";
import axios from "axios";
import { FOLLOW_ERROR } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useFollow = (uid, followed_id) => {
  const dispatch = useDispatch();
  const [isFollowed, setIsFollowed] = useState(null);

  const followUser = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.post(`/api/users/follow`, { uid, followed_id }, headers)
      .then((res) => {
        setIsFollowed(res.data.followed)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "FOLLOW_ERROR"));
        dispatch({
          type: FOLLOW_ERROR
        })
      })
    return isFollowed
  }

  const checkFollowed = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    axios.post("/api/users/isfollowed", { uid, followed_id }, headers)
      .then((res) => {
        setIsFollowed(res.data.followed)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "FOLLOW_ERROR"));
        dispatch({
          type: FOLLOW_ERROR
        })
      })

    return isFollowed
  }

  useEffect(() => {
    checkFollowed()
  }, [])


  return [isFollowed, () => {
    followUser()
  }]

}

export default useFollow;