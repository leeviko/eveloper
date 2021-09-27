import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { search, clearSearch } from "../../actions/searchActions";

import PostSmall from './post/PostSmall';

const Search = () => {
  const { query } = useParams();

  const dispatch = useDispatch();
  const searchResult = useSelector(state => state.search.searchResult)
  const error = useSelector(state => state.error);
  const isLoading = useSelector(state => state.search.isLoading)
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    dispatch(clearSearch())
    dispatch(search(query))
    console.log("a");
  }, [])

  useEffect(() => {
    try {
      if(searchResult && error.id != "SEARCH_FAIL") {
        setSubmitted(true)
      }
    } catch(err) {
      setSubmitted(false)
    }
  }, [searchResult])

  useEffect(() => {
    dispatch(search(query))
  }, [query])

  return (
    <div className="search-results posts-page">
      <div className="search-page-container">
        {
          submitted &&
          searchResult["postsRes"].map((res, i) => 
            <PostSmall key={i} title={res.title} tags={res.tags} />
          )
        }
      </div>
    </div>
  )
}

export default Search;
