import axios from "axios";
import { clearErrors, returnErrors } from "./errorActions";
import {
  LOADING,
  GET_POST,
  ADD_POST,
  LIKE_POST,
  FAVORITE_POST,
  DELETE_POST,
  POSTS_LOADING,
  POST_ERROR,
  CLEAR_POSTS,
  POST_LIKES,
  NEW_COMMENT,
  COMMENT_ERROR,
} from "./types";


// Add post
export const addPost = (post) => dispatch => {
  dispatch({ type: POSTS_LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.post("/api/posts", post, headers)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      dispatch(clearErrors())
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
      dispatch({
        type: POST_ERROR
      })
    })
}

// Get post
export const getPost = (id) => dispatch => {
  dispatch({ type: POSTS_LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.all([
    axios.get(`/api/posts/${id}`, headers), 
    axios.get(`/api/posts/${id}/comments`, headers), 
  ])
  .then(axios.spread((postRes, commentsRes) => {
    console.log({ post: postRes.data.post, comments: commentsRes.data});
    dispatch({ 
      type: GET_POST, 
      payload: { post: postRes.data.post, comments: commentsRes.data}
    })
  }))
  .catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
    dispatch({
      type: POST_ERROR
    })
  })

}

export const newComment = (bid, uid, comment, name) => dispatch => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = { uid, comment, name }

  axios.post(`/api/posts/${bid}/comment`, body, headers)
    .then(res => {
      dispatch({ 
        type: NEW_COMMENT,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "COMMENT_ERROR"));
      dispatch({
        type: COMMENT_ERROR
      })
    })
}

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}
