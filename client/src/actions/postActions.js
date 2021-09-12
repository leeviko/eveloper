import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  LOADING,
  GET_POSTS,
  ADD_POST,
  LIKE_POST,
  FAVORITE_POST,
  DELETE_POST,
  POSTS_LOADING,
  POST_ERROR
} from "../actions/types";


// Add post
export const addPost = (post) => dispatch => {

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.post("/api/posts", post, headers)
    .then((res) => {
      console.log(res);
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "POST_ERROR"));
      dispatch({
        type: POST_ERROR
      })
    })
}