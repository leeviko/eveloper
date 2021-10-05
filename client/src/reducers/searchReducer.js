import {
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_SEARCH,
  SEARCH_LOADING,
  GET_RECENT,
  RECENT_FAIL
} from "../actions/types";

const initialState = {
  searchResult: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_SUCCESS:
    case GET_RECENT:
      return {
        ...state,
        searchResult: action.payload,
        isLoading: false
      };  
    case SEARCH_FAIL:
    case RECENT_FAIL:
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResult: null,
        isLoading: false
      };
    case SEARCH_LOADING:
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }

}