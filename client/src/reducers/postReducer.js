import {
  GET_POST,
  ADD_POST,
  LIKE_POST,
  FAVORITE_POST,
  DELETE_POST,
  POSTS_LOADING,
  POST_ERROR,
  CLEAR_POSTS
} from "../actions/types";

const initialState = {
  post: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case ADD_POST:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        isLoading: false,
        post: action.payload,
      };
    case CLEAR_POSTS:
    case POST_ERROR:
      return {
        ...state,
        isLoading: false,
        post: null
      }
    default:
      return state;
  }
}