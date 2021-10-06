import { useState, useEffect } from "react";
import axios from "axios";
import { COMMENT_ERROR } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useComment = (bid) => {
  const dispatch = useDispatch();
  const [commentCount, setCommentCount] = useState(null);
  
  const getComments = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.get(`/api/posts/${bid}/comments`, headers)
      .then((res) => {
        setCommentCount(res.data.comments.length)
      })
      .catch((err) => {
        setCommentCount(null)
        dispatch(returnErrors(err.response.data, err.response.status, "COMMENT_ERROR"));
        dispatch({
          type: COMMENT_ERROR
        })
      })

    return commentCount
  }

  useEffect(() => {
    getComments()
  }, [])


  return commentCount

}

export default useComment;