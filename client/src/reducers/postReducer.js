import {
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
  AUTHOR_ERROR,
  GET_AUTHOR,
  POST_DELETE
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
    case NEW_COMMENT:
      return {
        ...state,
        post: {...state.post, comments: action.payload}
      };
    case GET_AUTHOR:
      return {
        ...state,
        post: { ...state.post, author: action.payload }
      };
    case LIKE_POST: 
      return {
        ...state,
        isLoading: false
      };
    case POST_DELETE:
      return {
        ...state,
        post: action.payload,
        isLoading: false
      }
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