import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  search: searchReducer
});
