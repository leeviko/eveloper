import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  DELETE_USER,
  DELETE_FAIL
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.sessUser,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case DELETE_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}