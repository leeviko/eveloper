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
  }, [])

  useEffect(() => {
    try {
      console.log("AAA");
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
        <div className="search-posts">
          <h3 className="search-title">Posts: </h3>
          {
            !isLoading &&
            submitted &&
            searchResult["postsRes"].map((res, i) => 
              <PostSmall key={i} bid={res.bid} title={res.title} tags={res.tags} />
            )
          }
        </div>
        <div className="search-users">
          <h3 className="search-title">Users: </h3>
          {
            !isLoading &&
            submitted &&
            searchResult["usersRes"].map((res, i) => 
              <p>{res.name}</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Search;
