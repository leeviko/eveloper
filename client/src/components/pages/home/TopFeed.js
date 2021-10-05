import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTop } from '../../../actions/searchActions';

import PostSmall from "../post/PostSmall";

const RecentFeed = () => {
  const dispatch = useDispatch();
  const topRes = useSelector(state => state.search.searchResult)
  const [topResult, setTopResult] = useState(null);

  useEffect(() =>  {
    dispatch(getTop())
  }, [])
  
  useEffect(() => {
    try {
      if(topRes.topResult) {
        setTopResult(topRes.topResult)
      } else {
        setTopResult(null)
      }
    } catch(err) {
      console.log("error");
    }
  }, [topRes])

  useEffect(() => {
    console.log(topResult);
  }, [topResult])

  return (
    <div className="feed">
      {
        !topResult ? "Posts loading..." : 
        <>
          {
            topResult.map(post => (
              <PostSmall key={post.bid} bid={post.bid} author_id={post.uid} title={post.title} tags={post.tags} date={post.createdat} />
            ))
          }
        </> 
      }
    </div>
  )
}

export default RecentFeed
