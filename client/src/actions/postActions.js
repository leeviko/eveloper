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

  // axios.get(`/api/posts/${id}`, headers)
  //   .then((res) => {
  //     // console.log({ post: res.data.post, comments: [{"comment": "nice post"}] });
  //     dispatch({
  //       type: GET_POST,
  //       payload: res.data
  //     });
  //     dispatch(clearErrors())
  //   })
  //   .catch((err) => {
  //     dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
  //     dispatch({
  //       type: POST_ERROR
  //     })
  //   })

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

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}