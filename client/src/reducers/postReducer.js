import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  GET_POSTS,
  ADD_POST,
  LIKE_POST,
  FAVORITE_POST,
  DELETE_POST,
  POSTS_LOADING,
  POST_ERROR
} from "../actions/types";

const initialState = {
  post: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "ADD_POST":
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case "POST_ERROR":
      return {
        ...state,
        isLoading: false,
        post: null
      }
    default:
      return state;
  }
}