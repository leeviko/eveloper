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
  GET_AUTHOR,
  AUTHOR_ERROR,
  POST_DELETE,
  POST_DELETE_FAIL,
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

// Delete post
export const deletePost = (bid) => dispatch => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  console.log(bid);
  axios.delete(`/api/posts/${bid}`, headers)
    .then((res) => {
      dispatch({
        type: POST_DELETE,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "POST_DELETE_FAIL"));
      dispatch({
        type: POST_DELETE_FAIL
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

export const getAuthor = (author_id) => dispatch => {

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.get(`/api/search/users/${author_id}`, headers)
  .then((res) => {
    dispatch({ 
      type: GET_AUTHOR,
      payload: res.data.usersRes[0]
    })
  })
  .catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, "AUTHOR_ERROR"));
    dispatch({
      type: AUTHOR_ERROR
    })
  })

}

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  }
}
