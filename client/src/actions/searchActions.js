import axios from "axios";
import { clearErrors, returnErrors } from "./errorActions";
import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_SEARCH,
  SEARCH_LOADING
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