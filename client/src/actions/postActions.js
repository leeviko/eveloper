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
  POST_LIKES
} from "../actions/types";


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

  axios.get(`/api/posts/${id}`, headers)
    .then((res) => {
      dispatch({
        type: GET_POST,
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

export const likePost = (bid, uid) => dispatch => {
  dispatch({ type: POSTS_LOADING });
  
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = { uid }

  axios.post(`/api/posts/${bid}/like`, body, headers)
    .then((res) => {
      dispatch({
        type: LIKE_POST
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
      dispatch({
        type: POST_ERROR
      })
    })

}

export const postLikes = (bid) => dispatch => {

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.get(`api/posts/${bid}/likes`, headers)
    .then((res) => {
      dispatch({
        type: POST_LIKES
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
      dispatch({
        type: POST_ERROR
      })
    })

}

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}