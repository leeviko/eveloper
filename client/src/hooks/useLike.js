import { useState, useEffect } from "react";
import axios from "axios";
import { LIKE_ERROR } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useLike = (bid, uid) => {
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(null);

  const likePost = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.post(`/api/posts/${bid}/like`, { uid }, headers)
      .then((res) => {
        setLikeCount(res.data.likes)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "LIKE_ERROR"));
        dispatch({
          type: LIKE_ERROR
        })
      })
    return likeCount
  }

  const getLikes = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.get(`/api/posts/${bid}/likes`, headers)
      .then((res) => {
        setLikeCount(res.data.likes)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "LIKE_ERROR"));
        dispatch({
          type: LIKE_ERROR
        })
      })

    return likeCount
  }

  useEffect(() => {
    getLikes()
  }, [])


  return [likeCount, () => {
    likePost()
  }]

}

export default useLike;