import { useState, useEffect } from "react";
import axios from "axios";
import { COMMENT_ERROR } from "../actions/types";
import { useDispatch } from "react-redux";
import { returnErrors } from "../actions/errorActions";

const useComment = (bid, uid, newComment) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(null);
  const [postComments, setPostComments] = useState(null);

  const commentPost = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.post(`/api/posts/${bid}/comment`, { comment: newComment, uid }, headers)
      .then((res) => {
        setComment(res.data.newComment)
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status, "COMMENT_ERROR"));
        dispatch({
          type: COMMENT_ERROR
        })
      })
    return comment
  }

  const getComments = () => {
    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    }
  
    axios.get(`/api/posts/${bid}/comments`, headers)
      .then((res) => {
        setPostComments(res.data.comments)
      })
      .catch((err) => {
        setPostComments(null)
        dispatch(returnErrors(err.response.data, err.response.status, "COMMENT_ERROR"));
        dispatch({
          type: COMMENT_ERROR
        })
      })

    return postComments
  }

  useEffect(() => {
    getComments()
  }, [])


  return [postComments, () => {
    commentPost()
  }]

}

export default useComment;