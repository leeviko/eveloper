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

const initialState = {
  searchResult: null,
  isLoading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_SUCCESS:
    case GET_RECENT:
    case GET_TOP:
      return {
        ...state,
        searchResult: action.payload,
        isLoading: false
      };  
    case SEARCH_FAIL:
    case RECENT_FAIL:
    case TOP_FAIL:
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