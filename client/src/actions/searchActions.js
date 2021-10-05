import axios from "axios";
import { clearErrors, returnErrors } from "./errorActions";
import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_SEARCH,
  SEARCH_LOADING,
  GET_RECENT,
  RECENT_FAIL,
  TOP_FAIL,
  GET_TOP
} from "../actions/types";


export const search = (searchQuery) => dispatch => {
  dispatch({ type: SEARCH_LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.all([
    axios.get(`/api/search/posts/${searchQuery}`, headers), 
    axios.get(`/api/search/users/${searchQuery}`, headers), 
  ])
  .then(axios.spread((postsRes, usersRes) => {
    dispatch({ 
      type: SEARCH_SUCCESS, 
      payload: { usersRes: usersRes.data.usersRes, postsRes: postsRes.data.postsRes } 
    })
  }))
  .catch((err) => {
    dispatch(returnErrors(err.response.data, err.response.status, "SEARCH_FAIL"));
    dispatch({
      type: SEARCH_FAIL
    })
  })

}

export const getRecent = () => dispatch => {
  dispatch({ type: SEARCH_LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.get("/api/search/recentFeed", headers)
    .then((res) => {
      dispatch({
        type: GET_RECENT,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "RECENT_FAIL"));
      dispatch({
        type: RECENT_FAIL
      })
    })
}

export const getTop = () => dispatch => {
  dispatch({ type: SEARCH_LOADING });

  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  axios.get("/api/search/topFeed", headers)
    .then((res) => {
      dispatch({
        type: GET_TOP,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, "TOP_FAIL"));
      dispatch({
        type: TOP_FAIL
      })
    })
}

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  }
}
